package react

import "sync"

type reactor struct {
	mu    sync.RWMutex
	cells map[*cell]struct{}
}

type cell struct {
	mu           sync.RWMutex
	value        int
	callbacks    map[int]func(int)
	nextID       int
	dependencies []*cell
	dependents   []*cell
	compute      interface{}
	reactor      *reactor
}

type canceler struct {
	cell *cell
	id   int
}

func (c *canceler) Cancel() {
	c.cell.mu.Lock()
	delete(c.cell.callbacks, c.id)
	c.cell.mu.Unlock()
}

func (c *cell) Value() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.value
}

func (c *cell) SetValue(value int) {
	c.mu.Lock()
	if c.value == value {
		c.mu.Unlock()
		return
	}
	c.value = value
	dependents := make([]*cell, len(c.dependents))
	copy(dependents, c.dependents)
	c.mu.Unlock()
	
	c.propagateChange(dependents)
}

func (c *cell) propagateChange(dependents []*cell) {
	for _, dep := range dependents {
		dep.recompute()
	}
}

func (c *cell) recompute() {
	c.mu.Lock()
	oldValue := c.value
	
	switch compute := c.compute.(type) {
	case func(int) int:
		c.value = compute(c.dependencies[0].Value())
	case func(int, int) int:
		c.value = compute(c.dependencies[0].Value(), c.dependencies[1].Value())
	}
	
	if oldValue == c.value {
		c.mu.Unlock()
		return
	}
	
	callbacks := make(map[int]func(int), len(c.callbacks))
	for id, cb := range c.callbacks {
		callbacks[id] = cb
	}
	
	dependents := make([]*cell, len(c.dependents))
	copy(dependents, c.dependents)
	c.mu.Unlock()
	
	for _, cb := range callbacks {
		cb(c.value)
	}
	
	c.propagateChange(dependents)
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mu.Lock()
	id := c.nextID
	c.nextID++
	c.callbacks[id] = callback
	c.mu.Unlock()
	
	return &canceler{cell: c, id: id}
}

func New() Reactor {
	return &reactor{
		cells: make(map[*cell]struct{}),
	}
}

func (r *reactor) CreateInput(initial int) InputCell {
	r.mu.Lock()
	defer r.mu.Unlock()
	
	c := &cell{
		value:     initial,
		callbacks: make(map[int]func(int)),
		reactor:   r,
	}
	r.cells[c] = struct{}{}
	return c
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()
	
	depCell := dep.(*cell)
	c := &cell{
		value:        compute(depCell.Value()),
		callbacks:    make(map[int]func(int)),
		dependencies: []*cell{depCell},
		compute:      compute,
		reactor:      r,
	}
	
	depCell.mu.Lock()
	depCell.dependents = append(depCell.dependents, c)
	depCell.mu.Unlock()
	
	r.cells[c] = struct{}{}
	return c
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()
	
	dep1Cell := dep1.(*cell)
	dep2Cell := dep2.(*cell)
	c := &cell{
		value:        compute(dep1Cell.Value(), dep2Cell.Value()),
		callbacks:    make(map[int]func(int)),
		dependencies: []*cell{dep1Cell, dep2Cell},
		compute:      compute,
		reactor:      r,
	}
	
	dep1Cell.mu.Lock()
	dep1Cell.dependents = append(dep1Cell.dependents, c)
	dep1Cell.mu.Unlock()
	
	dep2Cell.mu.Lock()
	dep2Cell.dependents = append(dep2Cell.dependents, c)
	dep2Cell.mu.Unlock()
	
	r.cells[c] = struct{}{}
	return c
}