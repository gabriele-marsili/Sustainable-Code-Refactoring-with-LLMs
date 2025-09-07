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

	for r1 := 0; r1 < height; r1++ {
		for c1 := 0; c1 < width; c1++ {
			if diagram[r1][c1] != '+' {
				continue
			}
			for r2 := r1 + 1; r2 < height; r2++ {
				for c2 := c1 + 1; c2 < width; c2++ {
					if diagram[r2][c2] != '+' {
						continue
					}

					if diagram[r1][c2] != '+' || diagram[r2][c1] != '+' {
						continue
					}

					// Check horizontal edges
					validTop := true
					for c := c1 + 1; c < c2; c++ {
						if diagram[r1][c] != '-' && diagram[r1][c] != '+' {
							validTop = false
							break
						}
					}
					if !validTop {
						continue
					}

					validBottom := true
					for c := c1 + 1; c < c2; c++ {
						if diagram[r2][c] != '-' && diagram[r2][c] != '+' {
							validBottom = false
							break
						}
					}
					if !validBottom {
						continue
					}

					// Check vertical edges
					validLeft := true
					for r := r1 + 1; r < r2; r++ {
						if diagram[r][c1] != '|' && diagram[r][c1] != '+' {
							validLeft = false
							break
						}
					}
					if !validLeft {
						continue
					}

					validRight := true
					for r := r1 + 1; r < r2; r++ {
						if diagram[r][c2] != '|' && diagram[r][c2] != '+' {
							validRight = false
							break
						}
					}
					if !validRight {
						continue
					}

					rectangles++
				}
			}
		}
	}

	return rectangles
}