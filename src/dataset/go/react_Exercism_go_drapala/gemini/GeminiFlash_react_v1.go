package react

import "sync"

// Define reactor, cell and canceler types here.
// These types will implement the Reactor, Cell and Canceler interfaces, respectively.

type reactor struct {
	cells   []Cell
	mu      sync.RWMutex
	cleanup func() // Function to clean up resources when the reactor is no longer needed
}

type cell struct {
	value     int
	compute   func() int // Function to compute the value, can be nil for input cells
	dependencies []Cell
	callbacks []func(int)
	lock      sync.RWMutex
	reactor   *reactor
}

type inputCell struct {
	*cell
}

type computeCell struct {
	*cell
}

type canceler struct {
	callback func()
	mu       sync.Mutex
	canceled bool
}

func (c *canceler) Cancel() {
	c.mu.Lock()
	defer c.mu.Unlock()
	if !c.canceled {
		c.callback()
		c.canceled = true
	}
}

func (c *cell) Value() int {
	c.lock.RLock()
	defer c.lock.RUnlock()
	return c.value
}

func (c *cell) SetValue(value int) {
	c.lock.Lock()
	defer c.lock.Unlock()

	if c.value != value {
		c.value = value
		c.updateDependents()
		for _, callback := range c.callbacks {
			go callback(value) // Execute callbacks concurrently
		}
	}
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.lock.Lock()
	defer c.lock.Unlock()

	canceler := &canceler{
		callback: func() {
			c.lock.Lock()
			defer c.lock.Unlock()
			// Remove the callback from the slice
			for i, cb := range c.callbacks {
				if &cb == &callback { // Compare addresses to avoid issues with function equality
					c.callbacks = append(c.callbacks[:i], c.callbacks[i+1:]...)
					break
				}
			}
		},
		canceled: false,
	}

	c.callbacks = append(c.callbacks, callback)
	return canceler
}

func New() Reactor {
	r := &reactor{
		cells: make([]Cell, 0),
		cleanup: func() {
			// Clean up resources if needed.  For example, close channels, etc.
		},
	}
	return r
}

func (r *reactor) CreateInput(initial int) InputCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	input := &inputCell{&cell{value: initial, reactor: r}}
	r.cells = append(r.cells, input)
	return input
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	c := &computeCell{&cell{
		dependencies: []Cell{dep},
		reactor:      r,
	}}

	c.cell.compute = func() int {
		return compute(dep.Value())
	}

	c.cell.value = c.cell.compute()
	r.cells = append(r.cells, c)
	dep.(*cell).addDependent(c) // Add the compute cell as a dependent of the input cell
	return c
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	c := &computeCell{&cell{
		dependencies: []Cell{dep1, dep2},
		reactor:      r,
	}}

	c.cell.compute = func() int {
		return compute(dep1.Value(), dep2.Value())
	}

	c.cell.value = c.cell.compute()
	r.cells = append(r.cells, c)
	dep1.(*cell).addDependent(c) // Add the compute cell as a dependent of the input cell
	dep2.(*cell).addDependent(c) // Add the compute cell as a dependent of the input cell
	return c
}

func (c *cell) addDependent(dependent Cell) {
	c.lock.Lock()
	defer c.lock.Unlock()
	c.dependencies = append(c.dependencies, dependent)
}

func (c *cell) updateDependents() {
	for _, dependent := range c.dependencies {
		computeCell, ok := dependent.(*computeCell)
		if ok {
			newValue := computeCell.cell.compute()
			computeCell.SetValue(newValue)
		}
	}
}