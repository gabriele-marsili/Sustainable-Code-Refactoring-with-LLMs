package react

import "sync"

type reactor struct {
	mu sync.RWMutex
}

type cell struct {
	mu        sync.RWMutex
	value     int
	callbacks map[int]func(int)
	nextID    int
	deps      []Cell
	compute   interface{}
	reactor   *reactor
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
	callbacks := make([]func(int), 0, len(c.callbacks))
	for _, cb := range c.callbacks {
		callbacks = append(callbacks, cb)
	}
	c.mu.Unlock()
	
	for _, cb := range callbacks {
		cb(value)
	}
	
	c.reactor.mu.RLock()
	c.reactor.mu.RUnlock()
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mu.Lock()
	id := c.nextID
	c.nextID++
	if c.callbacks == nil {
		c.callbacks = make(map[int]func(int))
	}
	c.callbacks[id] = callback
	c.mu.Unlock()
	
	return &canceler{cell: c, id: id}
}

func (c *cell) updateCompute() {
	if c.compute == nil {
		return
	}
	
	var newValue int
	switch compute := c.compute.(type) {
	case func(int) int:
		newValue = compute(c.deps[0].Value())
	case func(int, int) int:
		newValue = compute(c.deps[0].Value(), c.deps[1].Value())
	default:
		return
	}
	
	c.mu.Lock()
	if c.value != newValue {
		c.value = newValue
		callbacks := make([]func(int), 0, len(c.callbacks))
		for _, cb := range c.callbacks {
			callbacks = append(callbacks, cb)
		}
		c.mu.Unlock()
		
		for _, cb := range callbacks {
			cb(newValue)
		}
	} else {
		c.mu.Unlock()
	}
}

func New() Reactor {
	return &reactor{}
}

func (r *reactor) CreateInput(initial int) InputCell {
	return &cell{
		value:   initial,
		reactor: r,
	}
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	c := &cell{
		value:   compute(dep.Value()),
		deps:    []Cell{dep},
		compute: compute,
		reactor: r,
	}
	
	dep.AddCallback(func(int) {
		c.updateCompute()
	})
	
	return c
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	c := &cell{
		value:   compute(dep1.Value(), dep2.Value()),
		deps:    []Cell{dep1, dep2},
		compute: compute,
		reactor: r,
	}
	
	updateFunc := func(int) {
		c.updateCompute()
	}
	
	dep1.AddCallback(updateFunc)
	dep2.AddCallback(updateFunc)
	
	return c
}