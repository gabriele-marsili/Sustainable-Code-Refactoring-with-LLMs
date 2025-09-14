package react

import "sync"

type reactor struct {
	mu sync.RWMutex
}

type cell struct {
	mu       sync.RWMutex
	value    int
	callbacks map[int]func(int)
	nextID   int
	deps     []Cell
	compute  interface{}
	reactor  *reactor
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
	if c.compute != nil {
		c.mu.RLock()
		defer c.mu.RUnlock()
		switch fn := c.compute.(type) {
		case func(int) int:
			return fn(c.deps[0].Value())
		case func(int, int) int:
			return fn(c.deps[0].Value(), c.deps[1].Value())
		}
	}
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.value
}

func (c *cell) SetValue(value int) {
	c.mu.Lock()
	oldValue := c.value
	c.value = value
	c.mu.Unlock()
	
	if oldValue != value {
		c.notifyCallbacks(value)
	}
}

func (c *cell) notifyCallbacks(value int) {
	c.mu.RLock()
	callbacks := make([]func(int), 0, len(c.callbacks))
	for _, callback := range c.callbacks {
		callbacks = append(callbacks, callback)
	}
	c.mu.RUnlock()
	
	for _, callback := range callbacks {
		callback(value)
	}
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mu.Lock()
	defer c.mu.Unlock()
	
	if c.callbacks == nil {
		c.callbacks = make(map[int]func(int))
	}
	
	id := c.nextID
	c.nextID++
	c.callbacks[id] = callback
	
	return &canceler{cell: c, id: id}
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
		deps:    []Cell{dep},
		compute: compute,
		reactor: r,
	}
	
	dep.AddCallback(func(int) {
		oldValue := c.Value()
		newValue := compute(dep.Value())
		if oldValue != newValue {
			c.notifyCallbacks(newValue)
		}
	})
	
	return c
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	c := &cell{
		deps:    []Cell{dep1, dep2},
		compute: compute,
		reactor: r,
	}
	
	updateCallback := func(int) {
		oldValue := c.Value()
		newValue := compute(dep1.Value(), dep2.Value())
		if oldValue != newValue {
			c.notifyCallbacks(newValue)
		}
	}
	
	dep1.AddCallback(updateCallback)
	dep2.AddCallback(updateCallback)
	
	return c
}