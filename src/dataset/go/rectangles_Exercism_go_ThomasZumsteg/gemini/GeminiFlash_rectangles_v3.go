package rectangles

func Count(grid []string) int {
	total := 0
	height := len(grid)
	if height == 0 {
		return 0
	}
	width := len(grid[0])

	for i := 0; i < height-1; i++ {
		for j := 0; j < width-1; j++ {
			if grid[i][j] == '+' {
				for h := i + 1; h < height; h++ {
					for w := j + 1; w < width; w++ {
						if grid[h][w] == '+' {
							if CheckRectangle(grid, i, j, h, w) {
								total++
							}
						}
					}
				}
			}
		}
	}
	return total
}

func CheckRectangle(grid []string, i, j, h, w int) bool {
	if grid[i][j] != '+' || grid[i][w] != '+' || grid[h][j] != '+' || grid[h][w] != '+' {
		return false
	}

	for x := i + 1; x < h; x++ {
		if (grid[x][j] != '|' && grid[x][j] != '+') || (grid[x][w] != '|' && grid[x][w] != '+') {
			return false
		}
	}

	for y := j + 1; y < w; y++ {
		if (grid[i][y] != '-' && grid[i][y] != '+') || (grid[h][y] != '-' && grid[h][y] != '+') {
			return false
		}
	}

	return true
}