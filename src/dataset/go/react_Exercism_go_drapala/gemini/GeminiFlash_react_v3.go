package react

import "sync"

// Define reactor, cell and canceler types here.
// These types will implement the Reactor, Cell and Canceler interfaces, respectively.

type reactor struct {
	cells   []*cell
	mu      sync.RWMutex
	cleanup func()
}

type cell struct {
	reactor     *reactor
	value       int
	computeFunc interface{}
	dependencies []Cell
	callbacks   []func(int)
	mu          sync.RWMutex
	valid       bool
}

type inputCell struct {
	*cell
}

type computeCell struct {
	*cell
}

type canceler struct {
	cell     *cell
	callback func(int)
}

func (c *canceler) Cancel() {
	c.cell.mu.Lock()
	defer c.cell.mu.Unlock()

	for i, cb := range c.cell.callbacks {
		if &cb == &c.callback {
			c.cell.callbacks = append(c.cell.callbacks[:i], c.cell.callbacks[i+1:]...)
			return
		}
	}
}

func (c *cell) Value() int {
	c.mu.RLock()
	defer c.mu.RUnlock()

	if !c.valid {
		c.computeValue()
	}
	return c.value
}

func (c *cell) SetValue(value int) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.value != value {
		c.value = value
		c.valid = true
		c.updateDependents()
	}
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.callbacks = append(c.callbacks, callback)
	return &canceler{cell: c, callback: callback}
}

func New() Reactor {
	r := &reactor{
		cells: make([]*cell, 0),
	}
	return r
}

func (r *reactor) CreateInput(initial int) InputCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	c := &cell{
		reactor: r,
		value:   initial,
		valid:   true,
	}
	r.cells = append(r.cells, c)
	return &inputCell{c}
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	c := &cell{
		reactor:     r,
		computeFunc: compute,
		dependencies: []Cell{dep},
	}
	r.cells = append(r.cells, c)
	depCell := dep.(*cell)
	c.value = compute(depCell.Value())
	c.valid = true
	return &computeCell{c}
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()

	c := &cell{
		reactor:     r,
		computeFunc: compute,
		dependencies: []Cell{dep1, dep2},
	}
	r.cells = append(r.cells, c)
	dep1Cell := dep1.(*cell)
	dep2Cell := dep2.(*cell)
	c.value = compute(dep1Cell.Value(), dep2Cell.Value())
	c.valid = true
	return &computeCell{c}
}

func (c *cell) computeValue() {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.valid {
		return
	}

	if c.computeFunc == nil {
		return
	}

	switch f := c.computeFunc.(type) {
	case func(int) int:
		c.value = f(c.dependencies[0].Value())
	case func(int, int) int:
		c.value = f(c.dependencies[0].Value(), c.dependencies[1].Value())
	}
	c.valid = true
}

func (c *cell) updateDependents() {
	for _, dependent := range c.reactor.cells {
		for _, dependency := range dependent.dependencies {
			if dependency == c {
				dependent.mu.Lock()
				dependent.valid = false
				dependent.mu.Unlock()
				dependent.computeValue()
				for _, callback := range dependent.callbacks {
					go callback(dependent.Value())
				}
				dependent.updateDependents()
				break
			}
		}
	}
}