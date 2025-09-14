package react

const TestVersion = 3

type sheet struct {
	cells []*cell
}

type callback *func(int)

type cell struct {
	sheet     *sheet
	value     int
	update    func() bool
	stale     bool
	callbacks []callback
}

func (c *cell) Value() int {
	return c.value
}

func (c *cell) SetValue(val int) {
	if c.value != val {
		c.value = val
		c.stale = true
		c.sheet.update()
	}
}

func (c *cell) AddCallback(f func(int)) CallbackHandle {
	c.callbacks = append(c.callbacks, &f)
	return &f
}

func (c *cell) RemoveCallback(remove CallbackHandle) {
	removePtr := callback(remove.(*func(int)))
	for i, handle := range c.callbacks {
		if handle == removePtr {
			c.callbacks = append(c.callbacks[:i], c.callbacks[i+1:]...)
			return
		}
	}
}

func New() Reactor {
	return &sheet{
		cells: make([]*cell, 0, 8),
	}
}

func (s *sheet) CreateInput(val int) InputCell {
	inpCell := &cell{
		sheet: s,
		value: val,
		callbacks: make([]callback, 0, 2),
	}

	inpCell.update = func() bool {
		if inpCell.stale {
			inpCell.stale = false
			return true
		}
		return false
	}

	s.cells = append(s.cells, inpCell)
	return inpCell
}

func (s *sheet) CreateCompute1(input Cell, compVal func(int) int) ComputeCell {
	return s.createComputeGeneral([]Cell{input}, func(cells []Cell) int {
		return compVal(cells[0].Value())
	})
}

func (s *sheet) CreateCompute2(input1, input2 Cell, compVal func(int, int) int) ComputeCell {
	return s.createComputeGeneral([]Cell{input1, input2}, func(cells []Cell) int {
		return compVal(cells[0].Value(), cells[1].Value())
	})
}

func (s *sheet) createComputeGeneral(cells []Cell, compFunc func([]Cell) int) ComputeCell {
	compCell := &cell{
		sheet: s,
		callbacks: make([]callback, 0, 2),
	}

	compCell.update = func() bool {
		oldVal := compCell.value
		compCell.value = compFunc(cells)
		return oldVal != compCell.value
	}

	compCell.update()
	s.cells = append(s.cells, compCell)
	return compCell
}

func (s *sheet) update() {
	for _, cellID := range s.cells {
		if cellID.update() {
			for _, callID := range cellID.callbacks {
				(*callID)(cellID.value)
			}
		}
	}
}