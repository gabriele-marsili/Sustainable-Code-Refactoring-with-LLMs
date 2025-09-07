package rectangles

const CORNER rune = '+'
const VERTICAL_EDGE rune = '|'
const HORIZONTAL_EDGE rune = '-'

func Count(diagram []string) int {
	rectangles := 0
	height := len(diagram)
	if height == 0 {
		return 0
	}
	width := len(diagram[0])

	for row := 0; row < height; row++ {
		for col := 0; col < width; col++ {
			if diagram[row][col] == byte(CORNER) {
				rectangles += countRectangles(diagram, row, col, height, width)
			}
		}
	}
	return rectangles
}

func countRectangles(diagram []string, rowStart, colStart, height, width int) int {
	count := 0
	for rowEnd := rowStart + 1; rowEnd < height; rowEnd++ {
		for colEnd := colStart + 1; colEnd < width; colEnd++ {
			if diagram[rowEnd][colEnd] == byte(CORNER) {
				if isValidRectangle(diagram, rowStart, colStart, rowEnd, colEnd) {
					count++
				}
			}
		}
	}
	return count
}

func isValidRectangle(diagram []string, rowStart, colStart, rowEnd, colEnd int) bool {
	// Check top-right and bottom-left corners
	if diagram[rowStart][colEnd] != byte(CORNER) || diagram[rowEnd][colStart] != byte(CORNER) {
		return false
	}

	// Check top and bottom edges
	for col := colStart + 1; col < colEnd; col++ {
		r := rune(diagram[rowStart][col])
		if r != HORIZONTAL_EDGE && r != CORNER {
			return false
		}
		r = rune(diagram[rowEnd][col])
		if r != HORIZONTAL_EDGE && r != CORNER {
			return false
		}
	}

	// Check left and right edges
	for row := rowStart + 1; row < rowEnd; row++ {
		r := rune(diagram[row][colStart])
		if r != VERTICAL_EDGE && r != CORNER {
			return false
		}
		r = rune(diagram[row][colEnd])
		if r != VERTICAL_EDGE && r != CORNER {
			return false
		}
	}

	return true
}