package react

import "sync"

type reactor struct {
	mu    sync.Mutex
	cells map[*cell]struct{}
}

type cell struct {
	mu        sync.RWMutex
	value     int
	callbacks map[*canceler]func(int)
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
		c.callback = nil
	}
}

func (c *cell) Value() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.value
}

func (c *cell) SetValue(value int) {
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

func (c *cell) AddCallback(callback func(int)) Canceler {
	c.mu.Lock()
	defer c.mu.Unlock()
	cn := &canceler{cell: c, callback: callback}
	if c.callbacks == nil {
		c.callbacks = make(map[*canceler]func(int))
	}
	c.callbacks[cn] = callback
	return cn
}

func New() Reactor {
	return &reactor{cells: make(map[*cell]struct{})}
}

func (r *reactor) CreateInput(initial int) InputCell {
	r.mu.Lock()
	defer r.mu.Unlock()
	c := &cell{value: initial, callbacks: make(map[*canceler]func(int))}
	r.cells[c] = struct{}{}
	return c
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()
	c := &cell{value: compute(dep.Value()), callbacks: make(map[*canceler]func(int))}
	r.cells[c] = struct{}{}
	go func() {
		dep.AddCallback(func(val int) {
			c.SetValue(compute(val))
		})
	}()
	return c
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	r.mu.Lock()
	defer r.mu.Unlock()
	c := &cell{value: compute(dep1.Value(), dep2.Value()), callbacks: make(map[*canceler]func(int))}
	r.cells[c] = struct{}{}
	go func() {
		dep1.AddCallback(func(val int) {
			c.SetValue(compute(val, dep2.Value()))
		})
		dep2.AddCallback(func(val int) {
			c.SetValue(compute(dep1.Value(), val))
		})
	}()
	return c
}