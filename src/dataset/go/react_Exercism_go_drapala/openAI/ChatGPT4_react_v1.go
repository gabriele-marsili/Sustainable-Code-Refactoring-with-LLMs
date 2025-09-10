package react

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
	cells map[*cell]struct{}
}

type cell struct {
	value      int
	callbacks  map[*canceler]func(int)
	dependents []*cell
}

type canceler struct {
	cell     *cell
	callback func(int)
}

func (c *canceler) Cancel() {
	if c.cell != nil && c.callback != nil {
		delete(c.cell.callbacks, c)
		c.cell = nil
		c.callback = nil
	}
}

func (c *cell) Value() int {
	return c.value
}

func (c *cell) SetValue(value int) {
	if c.value != value {
		c.value = value
		for _, dependent := range c.dependents {
			dependent.recompute()
		}
		for _, callback := range c.callbacks {
			callback(c.value)
		}
	}
}

func (c *cell) AddCallback(callback func(int)) Canceler {
	if c.callbacks == nil {
		c.callbacks = make(map[*canceler]func(int))
	}
	cn := &canceler{cell: c, callback: callback}
	c.callbacks[cn] = callback
	return cn
}

func (c *cell) recompute() {
	// Placeholder for recompute logic in compute cells
}

func New() Reactor {
	return &reactor{cells: make(map[*cell]struct{})}
}

func (r *reactor) CreateInput(initial int) InputCell {
	c := &cell{value: initial, callbacks: make(map[*canceler]func(int))}
	r.cells[c] = struct{}{}
	return c
}

func (r *reactor) CreateCompute1(dep Cell, compute func(int) int) ComputeCell {
	c := &cell{
		value: compute(dep.Value()),
		callbacks: make(map[*canceler]func(int)),
	}
	dep.(*cell).dependents = append(dep.(*cell).dependents, c)
	c.recompute = func() {
		newValue := compute(dep.Value())
		if c.value != newValue {
			c.value = newValue
			for _, callback := range c.callbacks {
				callback(c.value)
			}
		}
	}
	r.cells[c] = struct{}{}
	return c
}

func (r *reactor) CreateCompute2(dep1, dep2 Cell, compute func(int, int) int) ComputeCell {
	c := &cell{
		value: compute(dep1.Value(), dep2.Value()),
		callbacks: make(map[*canceler]func(int)),
	}
	dep1.(*cell).dependents = append(dep1.(*cell).dependents, c)
	dep2.(*cell).dependents = append(dep2.(*cell).dependents, c)
	c.recompute = func() {
		newValue := compute(dep1.Value(), dep2.Value())
		if c.value != newValue {
			c.value = newValue
			for _, callback := range c.callbacks {
				callback(c.value)
			}
		}
	}
	r.cells[c] = struct{}{}
	return c
}