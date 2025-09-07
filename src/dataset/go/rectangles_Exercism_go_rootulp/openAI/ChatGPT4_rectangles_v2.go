package rectangles

const CORNER rune = '+'
const VERTICAL_EDGE rune = '|'
const HORIZONTAL_EDGE rune = '-'

func Count(diagram []string) (rectangles int) {
	for rowIndex, row := range diagram {
		for columnIndex, token := range row {
			if isCorner(token) {
				rectangles += countRectanglesForTopLeft(diagram, columnIndex, rowIndex)
			}
		}
	}
	return rectangles
}

func countRectanglesForTopLeft(diagram []string, columnIndex int, rowIndex int) (rectangles int) {
	for col := columnIndex + 1; col < len(diagram[rowIndex]); col++ {
		if !isCorner(rune(diagram[rowIndex][col])) {
			if !isHorizontalEdge(rune(diagram[rowIndex][col])) {
				break
			}
			continue
		}
		for row := rowIndex + 1; row < len(diagram); row++ {
			if !isCorner(rune(diagram[row][columnIndex])) {
				if !isVerticalEdge(rune(diagram[row][columnIndex])) {
					break
				}
				continue
			}
			if isCorner(rune(diagram[row][col])) && isValidHorizontalEdge(diagram[rowIndex][columnIndex+1:col]) && isValidVerticalEdge(diagram, columnIndex, rowIndex+1, row) && isValidVerticalEdge(diagram, col, rowIndex+1, row) {
				rectangles++
			}
		}
	}
	return rectangles
}

func isValidHorizontalEdge(row string) bool {
	for _, v := range row {
		if !isHorizontalEdge(v) {
			return false
		}
	}
	return true
}

func isValidVerticalEdge(diagram []string, column int, rowStart int, rowEnd int) bool {
	for i := rowStart; i < rowEnd; i++ {
		if !isVerticalEdge(rune(diagram[i][column])) {
			return false
		}
	}
	return true
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