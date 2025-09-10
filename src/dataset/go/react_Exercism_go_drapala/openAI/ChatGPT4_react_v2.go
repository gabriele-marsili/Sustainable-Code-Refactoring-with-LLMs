package react

import "sync"

type Reactor interface {
	CreateInput(initial int) InputCell
	CreateCompute1(dep Cell, compute func(int) int) ComputeCell
	CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell
}

type Cell interface {
	Value() int
	AddCallback(func(int)) Canceler
}

type InputCell interface {
	Cell
	SetValue(value int)
}

type ComputeCell interface {
	Cell
}

type Canceler interface {
	Cancel()
}

type reactor struct {
	mu sync.Mutex
}

type cell struct {
	mu        sync.RWMutex
	value     int
	callbacks map[int]func(int)
	nextID    int
}

type inputCell struct {
	*cell
}

type computeCell struct {
	*cell
	compute func() int
}

type canceler struct {
	cell     *cell
	callbackID int
}

func (c *canceler) Cancel() {
	c.cell.mu.Lock()
	defer c.cell.mu.Unlock()
	delete(c.cell.callbacks, c.callbackID)
}

func (c *cell) Value() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.value
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mu.Lock()
	defer c.mu.Unlock()
	id := c.nextID
	c.nextID++
	c.callbacks[id] = callback
	return &canceler{cell: c, callbackID: id}
}

func (c *inputCell) SetValue(value int) {
	c.mu.Lock()
	if c.value != value {
		c.value = value
		callbacks := make([]func(int), 0, len(c.callbacks))
		for _, cb := range c.callbacks {
			callbacks = append(callbacks, cb)
		}
		c.mu.Unlock()
		for _, cb := range callbacks {
			cb(value)
		}
	} else {
		c.mu.Unlock()
	}
}

func (r *reactor) CreateInput(initial int) InputCell {
	return &inputCell{
		cell: &cell{
			value:     initial,
			callbacks: make(map[int]func(int)),
		},
	}
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	cc := &computeCell{
		cell: &cell{
			value:     compute(dep.Value()),
			callbacks: make(map[int]func(int)),
		},
		compute: func() int {
			return compute(dep.Value())
		},
	}
	dep.AddCallback(func(int) {
		cc.updateValue()
	})
	return cc
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	cc := &computeCell{
		cell: &cell{
			value:     compute(dep1.Value(), dep2.Value()),
			callbacks: make(map[int]func(int)),
		},
		compute: func() int {
			return compute(dep1.Value(), dep2.Value())
		},
	}
	dep1.AddCallback(func(int) {
		cc.updateValue()
	})
	dep2.AddCallback(func(int) {
		cc.updateValue()
	})
	return cc
}

func (cc *computeCell) updateValue() {
	cc.mu.Lock()
	newValue := cc.compute()
	if cc.value != newValue {
		cc.value = newValue
		callbacks := make([]func(int), 0, len(cc.callbacks))
		for _, cb := range cc.callbacks {
			callbacks = append(callbacks, cb)
		}
		cc.mu.Unlock()
		for _, cb := range callbacks {
			cb(newValue)
		}
	} else {
		cc.mu.Unlock()
	}
}

func New() Reactor {
	return &reactor{}
}