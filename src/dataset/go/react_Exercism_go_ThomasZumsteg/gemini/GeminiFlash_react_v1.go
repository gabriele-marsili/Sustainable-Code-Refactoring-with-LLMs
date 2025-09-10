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
	compute   func() int // Replaced update with compute for direct value calculation
	stale     bool       // Unused, can be removed if truly unused
	callbacks []callback
}

// Value returns the value of the cell
func (c *cell) Value() int {
	return c.value
}

// SetValue sets the static value of a cell.
func (c *cell) SetValue(val int) {
	if c.value != val {
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
	f := remove.(func(int))
	var newCallbacks []callback
	for _, handle := range c.callbacks {
		if !(funcEqual(handle, f)) {
			newCallbacks = append(newCallbacks, handle)
		}
	}
	c.callbacks = newCallbacks
}

func funcEqual(f1, f2 func(int)) bool {
	return funcPointer(f1) == funcPointer(f2)
}

func funcPointer(f func(int)) uintptr {
	return *(*uintptr)(unsafe.Pointer(&f))
}

/*New creats a new collection of cells.*/
func New() Reactor {
	return &sheet{}
}

/*CreateInput adds an cell with a static value to the collection of cells.*/
func (s *sheet) CreateInput(val int) InputCell {
	inpCell := &cell{sheet: s, value: val}
	s.cells = append(s.cells, inpCell)
	return inpCell
}

/*CreateCompute1 adds a cell with a computed value to the collection of cells.*/
func (s *sheet) CreateCompute1(input Cell, compVal func(int) int) ComputeCell {
	inputCell := input.(*cell)
	compCell := &cell{
		sheet: s,
		compute: func() int {
			return compVal(inputCell.Value())
		},
	}
	compCell.value = compCell.compute() // Initialize value
	s.cells = append(s.cells, compCell)
	return compCell
}

/*CreateCompute2 adds a cell with a computed value that depends on two cells.*/
func (s *sheet) CreateCompute2(input1, input2 Cell, compVal func(int, int) int) ComputeCell {
	inputCell1 := input1.(*cell)
	inputCell2 := input2.(*cell)

	compCell := &cell{
		sheet: s,
		compute: func() int {
			return compVal(inputCell1.Value(), inputCell2.Value())
		},
	}
	compCell.value = compCell.compute() // Initialize value
	s.cells = append(s.cells, compCell)
	return compCell
}

/*createComputeGeneral creates a compute cell that can depend on
any number of cells.*/
func (s *sheet) createComputeGeneral(cells []Cell, compFunc func([]Cell) int) ComputeCell {
	compCell := &cell{
		sheet: s,
		compute: func() int {
			return compFunc(cells)
		},
	}
	compCell.value = compCell.compute() // Initialize value
	s.cells = append(s.cells, compCell)
	return compCell
}

/*update checks all the cells in the sheet for an changes and runs callback on all
changed cells*/
func (s *sheet) update() {
	for _, cellID := range s.cells {
		if cellID.compute != nil {
			newValue := cellID.compute()
			if cellID.value != newValue {
				cellID.value = newValue
				for _, call := range cellID.callbacks {
					call(cellID.Value())
				}
			}
		}
	}
}

import "unsafe"