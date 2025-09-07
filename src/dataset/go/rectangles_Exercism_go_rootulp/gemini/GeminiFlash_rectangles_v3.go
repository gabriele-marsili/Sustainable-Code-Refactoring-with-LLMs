package rectangles

const CORNER rune = '+'
const VERTICAL_EDGE rune = '|'
const HORIZONTAL_EDGE rune = '-'

func Count(diagram []string) (rectangles int) {
	height := len(diagram)
	if height == 0 {
		return 0
	}
	width := len(diagram[0])

	for rowIndex := 0; rowIndex < height; rowIndex++ {
		row := diagram[rowIndex]
		for columnIndex := 0; columnIndex < width; columnIndex++ {
			if row[columnIndex] == byte(CORNER) {
				rectangles += countRectanglesForTopLeft(diagram, columnIndex, rowIndex, width, height)
			}
		}
	}
	return rectangles
}

func countRectanglesForTopLeft(diagram []string, columnIndex int, rowIndex int, width int, height int) (rectangles int) {
	for rightColumn := columnIndex + 1; rightColumn < width; rightColumn++ {
		if diagram[rowIndex][rightColumn] != byte(CORNER) {
			continue
		}

		validHorizontal := true
		for k := columnIndex + 1; k < rightColumn; k++ {
			r := rune(diagram[rowIndex][k])
			if r != HORIZONTAL_EDGE {
				validHorizontal = false
				break
			}
		}
		if !validHorizontal {
			continue
		}

		for bottomRow := rowIndex + 1; bottomRow < height; bottomRow++ {
			if diagram[bottomRow][columnIndex] != byte(CORNER) || diagram[bottomRow][rightColumn] != byte(CORNER) {
				continue
			}

			validVerticalLeft := true
			for k := rowIndex + 1; k < bottomRow; k++ {
				r := rune(diagram[k][columnIndex])
				if r != VERTICAL_EDGE {
					validVerticalLeft = false
					break
				}
			}
			if !validVerticalLeft {
				continue
			}

			validVerticalRight := true
			for k := rowIndex + 1; k < bottomRow; k++ {
				r := rune(diagram[k][rightColumn])
				if r != VERTICAL_EDGE {
					validVerticalRight = false
					break
				}
			}
			if !validVerticalRight {
				continue
			}

			validHorizontalBottom := true
			for k := columnIndex + 1; k < rightColumn; k++ {
				r := rune(diagram[bottomRow][k])
				if r != HORIZONTAL_EDGE {
					validHorizontalBottom = false
					break
				}
			}
			if !validHorizontalBottom {
				continue
			}

			rectangles++
		}
	}
	return rectangles
}