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

func countRectanglesForTopLeft(diagram []string, columnIndex int, rowIndex int) (rectangles int) {
	for col := columnIndex + 1; col < len(diagram[rowIndex]); col++ {
		if diagram[rowIndex][col] == CORNER {
			if !isValidHorizontalEdge(diagram[rowIndex][columnIndex+1 : col]) {
				break
			}
			for row := rowIndex + 1; row < len(diagram); row++ {
				if diagram[row][columnIndex] == CORNER && diagram[row][col] == CORNER {
					if isValidVerticalEdge(diagram, columnIndex, rowIndex+1, row) &&
						isValidVerticalEdge(diagram, col, rowIndex+1, row) {
						rectangles++
					}
				} else if diagram[row][columnIndex] != VERTICAL_EDGE || diagram[row][col] != VERTICAL_EDGE {
					break
				}
			}
		} else if diagram[rowIndex][col] != HORIZONTAL_EDGE {
			break
		}
	}
	return rectangles
}

func isValidHorizontalEdge(row string) bool {
	for _, v := range row {
		if v != HORIZONTAL_EDGE {
			return false
		}
	}
	return true
}

func isValidVerticalEdge(diagram []string, column int, rowStart int, rowEnd int) bool {
	for i := rowStart; i < rowEnd; i++ {
		if diagram[i][column] != VERTICAL_EDGE {
			return false
		}
	}
	return true
}