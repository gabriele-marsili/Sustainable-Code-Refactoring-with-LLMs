package react

//TestVersion is the unit tests this will pass.
const TestVersion = 3

// sheet is a collection of cells.
type sheet struct {
	cells []*cell
}

// callback is a function that is called when the cell changes.
type callback func(int)

// cell holds a value either computed or static.
type cell struct {
	sheet     *sheet
	value     int
	update    func() bool
	stale     bool
	callbacks []callback
}

// Value returns the value of the cell
func (c *cell) Value() int {
	return c.value
}

// SetValue sets the static value of a cell.
func (c *cell) SetValue(val int) {
	if c.value != val {
		c.stale = true
		c.value = val
		c.sheet.update()
	}
}

/*AddCallback adds a function to be run when the cell changes*/
func (c *cell) AddCallback(f func(int)) CallbackHandle {
	c.callbacks = append(c.callbacks, f)
	return f
}

/*RemoveCallback filters out callbacks so that the function no longer runs
when a cell changes.*/
func (c *cell) RemoveCallback(remove CallbackHandle) {
	newCallbacks := make([]callback, 0, len(c.callbacks))
	for _, handle := range c.callbacks {
		if handle != remove.(func(int)) {
			newCallbacks = append(newCallbacks, handle)
		}
	}
	c.callbacks = newCallbacks
}

/*New creats a new collection of cells.*/
func New() Reactor {
	return &sheet{cells: []*cell{}}
}

/*CreateInput adds an cell with a static value to the collection of cells.*/
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

/*CreateCompute1 adds a cell with a computed value to the collection of cells.*/
func (s *sheet) CreateCompute1(input Cell, compVal func(int) int) ComputeCell {
	comp := func(cells []Cell) int {
		return compVal(cells[0].Value())
	}

	return s.createComputeGeneral([]Cell{input}, comp)
}

/*CreateCompute2 adds a cell with a computed value that depends on two cells.*/
func (s *sheet) CreateCompute2(input1, input2 Cell, compVal func(int, int) int) ComputeCell {
	comp := func(cells []Cell) int {
		return compVal(cells[0].Value(), cells[1].Value())
	}

	return s.createComputeGeneral([]Cell{input1, input2}, comp)
}

/*createComputeGeneral creates a compute cell that can depend on
any number of cells.*/
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

/*update checks all the cells in the sheet for an changes and runs callback on all
changed cells*/
func (s *sheet) update() {
	for _, cellID := range s.cells {
		if cellID.update() {
			for _, call := range cellID.callbacks {
				call(cellID.Value())
			}
		}
	}
}