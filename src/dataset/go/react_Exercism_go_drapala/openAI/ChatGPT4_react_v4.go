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
	callbacks map[*canceler]func(int)
}

type inputCell struct {
	*cell
}

type computeCell struct {
	*cell
	deps    []Cell
	compute func(...int) int
}

type canceler struct {
	mu       sync.Mutex
	cell     *cell
	callback func(int)
}

func (c *canceler) Cancel() {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.cell != nil {
		c.cell.mu.Lock()
		delete(c.cell.callbacks, c)
		c.cell.mu.Unlock()
		c.cell = nil
	}
}

func (c *cell) Value() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.value
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mu.Lock()
	defer c.mu.Unlock()
	cn := &canceler{cell: c, callback: callback}
	c.callbacks[cn] = callback
	return cn
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

func (c *computeCell) computeValue() {
	values := make([]int, len(c.deps))
	for i, dep := range c.deps {
		values[i] = dep.Value()
	}
	newValue := c.compute(values...)
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
	return &inputCell{
		cell: &cell{
			value:     initial,
			callbacks: make(map[*canceler]func(int)),
		},
	}
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	cc := &computeCell{
		cell: &cell{
			callbacks: make(map[*canceler]func(int)),
		},
		deps:    []Cell{dep},
		compute: func(values ...int) int { return compute(values[0]) },
	}
	dep.AddCallback(func(int) { cc.computeValue() })
	cc.computeValue()
	return cc
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	cc := &computeCell{
		cell: &cell{
			callbacks: make(map[*canceler]func(int)),
		},
		deps:    []Cell{dep1, dep2},
		compute: func(values ...int) int { return compute(values[0], values[1]) },
	}
	dep1.AddCallback(func(int) { cc.computeValue() })
	dep2.AddCallback(func(int) { cc.computeValue() })
	cc.computeValue()
	return cc
}