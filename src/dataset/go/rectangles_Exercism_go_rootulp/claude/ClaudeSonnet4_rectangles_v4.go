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

func countRectanglesForTopLeft(diagram []string, columnIndex int, rowIndex int) int {
	rectangles := 0
	row := diagram[rowIndex]
	
	for rightCol := columnIndex + 1; rightCol < len(row); rightCol++ {
		if row[rightCol] == CORNER {
			if isValidHorizontalEdge(row[columnIndex:rightCol+1]) {
				for bottomRow := rowIndex + 1; bottomRow < len(diagram); bottomRow++ {
					if diagram[bottomRow][columnIndex] == CORNER && 
					   diagram[bottomRow][rightCol] == CORNER &&
					   isValidVerticalEdgeInline(diagram, columnIndex, rowIndex, bottomRow) &&
					   isValidVerticalEdgeInline(diagram, rightCol, rowIndex, bottomRow) &&
					   isValidHorizontalEdge(diagram[bottomRow][columnIndex:rightCol+1]) {
						rectangles++
					} else if diagram[bottomRow][columnIndex] != VERTICAL_EDGE {
						break
					}
				}
			}
		} else if row[rightCol] != HORIZONTAL_EDGE {
			break
		}
	}
	return rectangles
}

func isValidHorizontalEdge(row string) bool {
	for i := 0; i < len(row); i++ {
		r := rune(row[i])
		if r != CORNER && r != HORIZONTAL_EDGE {
			return false
		}
	}
	return true
}

func isValidVerticalEdgeInline(diagram []string, column int, rowStart int, rowEnd int) bool {
	for i := rowStart; i <= rowEnd; i++ {
		r := rune(diagram[i][column])
		if r != CORNER && r != VERTICAL_EDGE {
			return false
		}
	}
	return true
}