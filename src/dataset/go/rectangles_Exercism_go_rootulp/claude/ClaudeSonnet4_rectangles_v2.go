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
	
	// Find valid columns in the same row
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
	// Check each potential bottom row
	for bottomRow := topRow + 1; bottomRow < len(diagram); bottomRow++ {
		leftChar := rune(diagram[bottomRow][leftCol])
		rightChar := rune(diagram[bottomRow][rightCol])
		
		if leftChar == CORNER && rightChar == CORNER {
			// Check if horizontal edges are valid
			if isValidHorizontalEdge(diagram[bottomRow], leftCol, rightCol) {
				rectangles++
			}
		} else if leftChar != VERTICAL_EDGE || rightChar != VERTICAL_EDGE {
			break
		}
	}
	return rectangles
}

func isValidHorizontalEdge(row string, start, end int) bool {
	for i := start; i <= end; i++ {
		char := rune(row[i])
		if char != CORNER && char != HORIZONTAL_EDGE {
			return false
		}
	}
	return true
}