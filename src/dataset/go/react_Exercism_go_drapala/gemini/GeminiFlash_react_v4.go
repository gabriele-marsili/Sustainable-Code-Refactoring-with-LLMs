package react

import "sync"

// Reactor interface
type Reactor interface {
	CreateInput(initial int) InputCell
	CreateCompute1(dep Cell, compute func(int) int) ComputeCell
	CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell
}

// Cell interface
type Cell interface {
	Value() int
	AddCallback(callback func(int)) Canceler
}

// InputCell interface
type InputCell interface {
	Cell
	SetValue(value int)
}

// ComputeCell interface
type ComputeCell interface {
	Cell
}

// Canceler interface
type Canceler interface {
	Cancel()
}

type reactor struct {
	cells []cell
	mu    sync.RWMutex
}

type cell struct {
	value     int
	compute1  func(int) int
	compute2  func(int, int) int
	inputCell bool
	reactor   *reactor
	deps      []Cell
	callbacks []func(int)
	mu        sync.RWMutex
}

type canceler struct {
	cell     *cell
	callback func(int)
	mu       sync.Mutex
}

func (c *canceler) Cancel() {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.cell == nil || c.callback == nil {
		return
	}

	c.cell.mu.Lock()
	defer c.cell.mu.Unlock()

	newCallbacks := make([]func(int), 0, len(c.cell.callbacks))
	for _, cb := range c.cell.callbacks {
		if cb != c.callback {
			newCallbacks = append(newCallbacks, cb)
		}
	}
	c.cell.callbacks = newCallbacks

	c.cell = nil
	c.callback = nil
}

func (c *cell) Value() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.value
}

func (c *cell) SetValue(value int) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if !c.inputCell {
		return
	}

	if c.value != value {
		c.value = value
		c.updateDependents()
		c.notifyCallbacks()
	}
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.callbacks = append(c.callbacks, callback)
	canceler := &canceler{cell: c, callback: callback}
	return canceler
}

func (c *cell) updateDependents() {
	for _, dep := range c.reactor.cells {
		isDependent := false
		for _, d := range dep.deps {
			if d == c {
				isDependent = true
				break
			}
		}

		if isDependent {
			dep.recomputeValue()
		}
	}
}

func (c *cell) recomputeValue() {
	c.mu.Lock()
	defer c.mu.Unlock()

	oldValue := c.value

	if c.compute1 != nil {
		c.value = c.compute1(c.deps[0].Value())
	} else if c.compute2 != nil {
		c.value = c.compute2(c.deps[0].Value(), c.deps[1].Value())
	}

	if c.value != oldValue {
		c.notifyCallbacks()
		c.updateDependents()
	}
}

func (c *cell) notifyCallbacks() {
	c.mu.RLock()
	defer c.mu.RUnlock()

	for _, callback := range c.callbacks {
		go callback(c.value)
	}
}

func New() Reactor {
	return &reactor{cells: make([]cell, 0)}
}

func (r *reactor) CreateInput(initial int) InputCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	newCell := cell{value: initial, inputCell: true, reactor: r}
	r.cells = append(r.cells, newCell)
	return &newCell
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	newCell := cell{
		compute1: compute,
		reactor:  r,
		deps:     []Cell{dep},
	}
	newCell.value = compute(dep.Value())
	r.cells = append(r.cells, newCell)
	return &newCell
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	newCell := cell{
		compute2: compute,
		reactor:  r,
		deps:     []Cell{dep1, dep2},
	}
	newCell.value = compute(dep1.Value(), dep2.Value())
	r.cells = append(r.cells, newCell)
	return &newCell
}