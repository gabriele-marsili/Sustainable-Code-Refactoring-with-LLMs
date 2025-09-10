package react

const TestVersion = 3

type sheet struct {
	cells []*cell
}

type callback func(int)

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
	c.callbacks = append(c.callbacks, f)
	return f
}

func (c *cell) RemoveCallback(remove CallbackHandle) {
	filtered := c.callbacks[:0]
	for _, cb := range c.callbacks {
		if cb != remove {
			filtered = append(filtered, cb)
		}
	}
	c.callbacks = filtered
}

func New() Reactor {
	return &sheet{}
}

func (s *sheet) CreateInput(val int) InputCell {
	inpCell := &cell{sheet: s, value: val}
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
	compCell := &cell{sheet: s}
	compCell.update = func() bool {
		newVal := compFunc(cells)
		if compCell.value != newVal {
			compCell.value = newVal
			return true
		}
		return false
	}
	compCell.update()
	s.cells = append(s.cells, compCell)
	return compCell
}

func (s *sheet) update() {
	for _, cell := range s.cells {
		if cell.update() {
			for _, cb := range cell.callbacks {
				cb(cell.value)
			}
		}
	}
}