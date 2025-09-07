package rectangles

const CORNER rune = '+'
const VERTICAL_EDGE rune = '|'
const HORIZONTAL_EDGE rune = '-'

func Count(diagram []string) (rectangles int) {
	for rowIndex, row := range diagram {
		for columnIndex, token := range row {
			if token == CORNER {
				for col := columnIndex + 1; col < len(row); col++ {
					if diagram[rowIndex][col] != CORNER && diagram[rowIndex][col] != HORIZONTAL_EDGE {
						break
					}
					if diagram[rowIndex][col] == CORNER {
						for row := rowIndex + 1; row < len(diagram); row++ {
							if diagram[row][columnIndex] != CORNER && diagram[row][columnIndex] != VERTICAL_EDGE {
								break
							}
							if diagram[row][columnIndex] == CORNER && diagram[row][col] == CORNER {
								if isValidHorizontalEdge(diagram[rowIndex][columnIndex:col]) && isValidHorizontalEdge(diagram[row][columnIndex:col]) && isValidVerticalEdge(diagram, columnIndex, rowIndex, row) && isValidVerticalEdge(diagram, col, rowIndex, row) {
									rectangles++
								}
							}
						}
					}
				}
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

func isValidVerticalEdge(diagram []string, column int, rowStart int, rowEnd int) bool {
	for i := rowStart + 1; i < rowEnd; i++ {
		if diagram[i][column] != CORNER && diagram[i][column] != VERTICAL_EDGE {
			return false
		}
	}
	return true
}