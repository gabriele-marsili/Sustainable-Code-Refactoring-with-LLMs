package rectangles

const CORNER rune = '+'
const VERTICAL_EDGE rune = '|'
const HORIZONTAL_EDGE rune = '-'

func Count(diagram []string) (rectangles int) {
	if len(diagram) == 0 {
		return 0
	}
	
	for rowIndex, row := range diagram {
		for columnIndex, token := range row {
			if token == CORNER {
				rectangles += countRectanglesForTopLeft(diagram, columnIndex, rowIndex)
			}
		}
	}
	return rectangles
}

func countRectanglesForTopLeft(diagram []string, columnIndex int, rowIndex int) (rectangles int) {
	row := diagram[rowIndex]
	
	// Find valid columns inline
	for rightCol := columnIndex + 1; rightCol < len(row); rightCol++ {
		char := rune(row[rightCol])
		if char == CORNER {
			// Check if we can form rectangles with this right column
			rectangles += countRectanglesWithRightColumn(diagram, columnIndex, rowIndex, rightCol)
		} else if char != HORIZONTAL_EDGE {
			break
		}
	}
	return rectangles
}

func countRectanglesWithRightColumn(diagram []string, leftCol, topRow, rightCol int) (rectangles int) {
	// Pre-validate horizontal edge
	topRowStr := diagram[topRow]
	for i := leftCol + 1; i < rightCol; i++ {
		if char := rune(topRowStr[i]); char != CORNER && char != HORIZONTAL_EDGE {
			return 0
		}
	}
	
	// Find valid bottom rows
	for bottomRow := topRow + 1; bottomRow < len(diagram); bottomRow++ {
		leftChar := rune(diagram[bottomRow][leftCol])
		if leftChar == CORNER {
			// Check if this forms a valid rectangle
			if isValidRectangle(diagram, leftCol, topRow, rightCol, bottomRow) {
				rectangles++
			}
		} else if leftChar != VERTICAL_EDGE {
			break
		}
	}
	return rectangles
}

func isValidRectangle(diagram []string, leftCol, topRow, rightCol, bottomRow int) bool {
	// Check bottom-right corner
	if rune(diagram[bottomRow][rightCol]) != CORNER {
		return false
	}
	
	// Check bottom horizontal edge
	bottomRowStr := diagram[bottomRow]
	for i := leftCol + 1; i < rightCol; i++ {
		if char := rune(bottomRowStr[i]); char != CORNER && char != HORIZONTAL_EDGE {
			return false
		}
	}
	
	// Check right vertical edge
	for i := topRow + 1; i < bottomRow; i++ {
		if char := rune(diagram[i][rightCol]); char != CORNER && char != VERTICAL_EDGE {
			return false
		}
	}
	
	return true
}

func findValidColumns(diagram []string, columnIndex int, rowIndex int) (validColumns []int) {
	validColumns = []int{}
	row := diagram[rowIndex]

	for i := columnIndex + 1; i < len(row); i++ {
		if isCorner(rune(row[i])) {
			validColumns = append(validColumns, i)
		} else if !isHorizontalEdge(rune(row[i])) {
			return validColumns
		}
	}
	return validColumns
}

func findValidRows(diagram []string, columnIndex int, rowIndex int) (validRows []int) {
	validRows = []int{}

	for j := rowIndex + 1; j < len(diagram); j++ {
		if isCorner(rune(diagram[j][columnIndex])) {
			validRows = append(validRows, j)
		} else if !isVerticalEdge(rune(diagram[j][columnIndex])) {
			return validRows
		}
	}
	return validRows
}

func isValidHorizontalEdge(row string) bool {
	for _, v := range row {
		if !isCorner(v) && !isHorizontalEdge(v) {
			return false
		}
	}
	return true
}

func isValidVerticalEdge(column string) bool {
	for _, v := range column {
		if !isCorner(v) && !isVerticalEdge(v) {
			return false
		}
	}
	return true
}

func verticalEdge(diagram []string, column int, rowStart int, rowEnd int) (edge string) {
	for i := rowStart; i < rowEnd; i++ {
		edge += string(diagram[i][column])
	}
	return edge
}

func isCorner(r rune) bool {
	return r == CORNER
}

func isHorizontalEdge(r rune) bool {
	return r == HORIZONTAL_EDGE
}

func isVerticalEdge(r rune) bool {
	return r == VERTICAL_EDGE
}