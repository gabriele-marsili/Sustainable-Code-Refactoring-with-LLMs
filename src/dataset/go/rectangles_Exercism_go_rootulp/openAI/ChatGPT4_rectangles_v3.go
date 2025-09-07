package rectangles

const CORNER rune = '+'
const VERTICAL_EDGE rune = '|'
const HORIZONTAL_EDGE rune = '-'

func Count(diagram []string) (rectangles int) {
	for rowIndex, row := range diagram {
		for columnIndex, token := range row {
			if token == CORNER {
				rectangles += countRectanglesForTopLeft(diagram, columnIndex, rowIndex)
			}
		}
	}
	return rectangles
}

func countRectanglesForTopLeft(diagram []string, columnIndex, rowIndex int) (rectangles int) {
	for col := columnIndex + 1; col < len(diagram[rowIndex]); col++ {
		if diagram[rowIndex][col] != CORNER {
			if diagram[rowIndex][col] != HORIZONTAL_EDGE {
				break
			}
			continue
		}
		for row := rowIndex + 1; row < len(diagram); row++ {
			if diagram[row][columnIndex] != CORNER && diagram[row][columnIndex] != VERTICAL_EDGE {
				break
			}
			if diagram[row][col] == CORNER && isValidHorizontalEdge(diagram[rowIndex][columnIndex:col]) && isValidHorizontalEdge(diagram[row][columnIndex:col]) && isValidVerticalEdge(diagram, columnIndex, rowIndex, row) && isValidVerticalEdge(diagram, col, rowIndex, row) {
				rectangles++
			}
		}
	}
	return rectangles
}

func isValidHorizontalEdge(row string) bool {
	for _, v := range row {
		if v != CORNER && v != HORIZONTAL_EDGE {
			return false
		}
	}
	return true
}

func isValidVerticalEdge(diagram []string, column, rowStart, rowEnd int) bool {
	for i := rowStart + 1; i < rowEnd; i++ {
		if diagram[i][column] != VERTICAL_EDGE {
			return false
		}
	}
	return true
}