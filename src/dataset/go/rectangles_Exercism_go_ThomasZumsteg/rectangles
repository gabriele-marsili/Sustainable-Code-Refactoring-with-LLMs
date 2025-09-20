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
			if grid[i][j] == '+' {
				for w := j + 1; w < cols; w++ {
					if grid[i][w] == '+' && isHorizontalLine(grid[i][j:w+1]) {
						for h := i + 1; h < rows; h++ {
							if grid[h][j] == '+' && grid[h][w] == '+' && isVerticalLine(grid, j, h, i) && isVerticalLine(grid, w, h, i) {
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

func isHorizontalLine(row string) bool {
	for _, ch := range row {
		if ch != '-' && ch != '+' {
			return false
		}
	}
	return true
}

func isVerticalLine(grid []string, col, endRow, startRow int) bool {
	for x := startRow + 1; x < endRow; x++ {
		if grid[x][col] != '|' && grid[x][col] != '+' {
			return false
		}
	}
	return true
}