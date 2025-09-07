package rectangles

func Count(grid []string) int {
	total := 0
	rows := len(grid)
	if rows == 0 {
		return 0
	}
	cols := len(grid[0])

	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			if grid[i][j] != '+' {
				continue
			}
			for w := j + 1; w < cols; w++ {
				if grid[i][w] != '+' {
					continue
				}
				for h := i + 1; h < rows; h++ {
					if grid[h][j] != '+' || grid[h][w] != '+' {
						continue
					}
					if isRectangle(grid, i, j, h, w) {
						total++
					}
				}
			}
		}
	}
	return total
}

func isRectangle(grid []string, i, j, h, w int) bool {
	for x := i + 1; x < h; x++ {
		if grid[x][j] != '|' && grid[x][j] != '+' {
			return false
		}
		if grid[x][w] != '|' && grid[x][w] != '+' {
			return false
		}
	}
	for y := j + 1; y < w; y++ {
		if grid[i][y] != '-' && grid[i][y] != '+' {
			return false
		}
		if grid[h][y] != '-' && grid[h][y] != '+' {
			return false
		}
	}
	return true
}