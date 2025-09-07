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

	corners := make([][]bool, height)
	for i := range corners {
		corners[i] = make([]bool, width)
	}

	for r := 0; r < height; r++ {
		for c := 0; c < width; c++ {
			corners[r][c] = diagram[r][c] == CORNER
		}
	}

	for r1 := 0; r1 < height; r1++ {
		for c1 := 0; c1 < width; c1++ {
			if !corners[r1][c1] {
				continue
			}
			for r2 := r1 + 1; r2 < height; r2++ {
				if !corners[r2][c1] {
					continue
				}
				validVertical := true
				for r := r1 + 1; r < r2; r++ {
					char := rune(diagram[r][c1])
					if char != VERTICAL_EDGE {
						validVertical = false
						break
					}
				}
				if !validVertical {
					continue
				}

				for c2 := c1 + 1; c2 < width; c2++ {
					if !corners[r1][c2] {
						continue
					}

					validHorizontalTop := true
					for c := c1 + 1; c < c2; c++ {
						char := rune(diagram[r1][c])
						if char != HORIZONTAL_EDGE {
							validHorizontalTop = false
							break
						}
					}
					if !validHorizontalTop {
						continue
					}

					if !corners[r2][c2] {
						continue
					}

					validHorizontalBottom := true
					for c := c1 + 1; c < c2; c++ {
						char := rune(diagram[r2][c])
						if char != HORIZONTAL_EDGE {
							validHorizontalBottom = false
							break
						}
					}
					if !validHorizontalBottom {
						continue
					}

					validVerticalRight := true
					for r := r1 + 1; r < r2; r++ {
						char := rune(diagram[r][c2])
						if char != VERTICAL_EDGE {
							validVerticalRight = false
							break
						}
					}
					if !validVerticalRight {
						continue
					}

					rectangles++
				}
			}
		}
	}

	return rectangles
}