package react

import "sync"

// Define reactor, cell and canceler types here.
// These types will implement the Reactor, Cell and Canceler interfaces, respectively.

type reactor struct {
	cells   []Cell
	mutex sync.RWMutex
}

type cell struct {
	value       int
	computeFunc func() int
	dependencies []Cell
	callbacks   []func(int)
	reactor     *reactor
	mutex sync.RWMutex
}

type inputCell struct {
	cell
}

type computeCell struct {
	cell
}

type canceler struct {
	cell    *cell
	callback func(int)
	mutex sync.Mutex
	cancelled bool
}

func (c *canceler) Cancel() {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	if c.cancelled {
		return
	}
	c.cancelled = true

	c.cell.mutex.Lock()
	defer c.cell.mutex.Unlock()

	// Remove the callback from the cell's callback list.  Iterate backwards for efficient removal.
	for i := len(c.cell.callbacks) - 1; i >= 0; i-- {
		if &c.cell.callbacks[i] == &c.callback {
			c.cell.callbacks = append(c.cell.callbacks[:i], c.cell.callbacks[i+1:]...)
			break
		}
	}
}

func (c *cell) Value() int {
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.value
}

func (c *cell) SetValue(value int) {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	if c.value != value {
		c.value = value
		c.updateCallbacks()
	}
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	c.callbacks = append(c.callbacks, callback)
	canceler := &canceler{cell: c, callback: callback}
	return canceler
}

func (c *cell) updateCallbacks() {
	for _, callback := range c.callbacks {
		go callback(c.Value()) // Execute callbacks in goroutines to avoid blocking
	}
}

func New() Reactor {
	return &reactor{
		cells: make([]Cell, 0),
	}
}

func (r *reactor) CreateInput(initial int) InputCell {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	input := inputCell{cell: cell{value: initial, reactor: r, callbacks: make([]func(int), 0)}}
	r.cells = append(r.cells, &input)
	return input
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	computeCell := computeCell{cell: cell{
		dependencies: []Cell{dep},
		reactor:     r,
		callbacks:   make([]func(int), 0),
	}}

	computeCell.cell.computeFunc = func() int {
		return compute(dep.Value())
	}

	computeCell.cell.value = computeCell.cell.computeFunc()
	r.cells = append(r.cells, &computeCell)

	return computeCell
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	computeCell := computeCell{cell: cell{
		dependencies: []Cell{dep1, dep2},
		reactor:     r,
		callbacks:   make([]func(int), 0),
	}}

	computeCell.cell.computeFunc = func() int {
		return compute(dep1.Value(), dep2.Value())
	}

	computeCell.cell.value = computeCell.cell.computeFunc()
	r.cells = append(r.cells, &computeCell)

	return computeCell
}