package rectangles

func Count(grid []string) int {
	total := 0
	rows := len(grid)
	if rows == 0 {
		return 0
	}
	cols := len(grid[0])

	for i := 0; i < rows-1; i++ {
		for j := 0; j < cols-1; j++ {
			if grid[i][j] == '+' {
				for h := i + 1; h < rows; h++ {
					for w := j + 1; w < cols; w++ {
						if grid[h][w] == '+' {
							if CheckRectangle(grid, i, j, h, w, rows, cols) {
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

func CheckRectangle(grid []string, i, j, h, w, rows, cols int) bool {
	if grid[i][w] != '+' || grid[h][j] != '+' {
		return false
	}

	for x := i + 1; x < h; x++ {
		if !(grid[x][j] == '|' || grid[x][j] == '+') || !(grid[x][w] == '|' || grid[x][w] == '+') {
			return false
		}
	}

	for y := j + 1; y < w; y++ {
		if !(grid[i][y] == '-' || grid[i][y] == '+') || !(grid[h][y] == '-' || grid[h][y] == '+') {
			return false
		}
	}

	return true
}