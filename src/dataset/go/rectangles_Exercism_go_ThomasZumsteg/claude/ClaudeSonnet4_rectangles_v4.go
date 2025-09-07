package rectangles

func Count(grid []string) int {
	if len(grid) < 2 {
		return 0
	}
	
	total := 0
	rows := len(grid)
	
	for i := 0; i < rows-1; i++ {
		cols := len(grid[i])
		if cols < 2 {
			continue
		}
		
		for j := 0; j < cols-1; j++ {
			if grid[i][j] != '+' {
				continue
			}
			
			for h := i + 1; h < rows; h++ {
				if len(grid[h]) <= j || grid[h][j] != '+' {
					continue
				}
				
				for w := j + 1; w < cols && w < len(grid[h]); w++ {
					if grid[i][w] == '+' && grid[h][w] == '+' && 
						CheckRectangle(grid, i, j, h, w) {
						total++
					}
				}
			}
		}
	}
	return total
}

func CheckRectangle(grid []string, i, j, h, w int) bool {
	for y := j + 1; y < w; y++ {
		if !isHorizontalEdge(grid[i][y]) || !isHorizontalEdge(grid[h][y]) {
			return false
		}
	}
	
	for x := i + 1; x < h; x++ {
		if !isVerticalEdge(grid[x][j]) || !isVerticalEdge(grid[x][w]) {
			return false
		}
	}
	
	return true
}

func isHorizontalEdge(c byte) bool {
	return c == '-' || c == '+'
}

func isVerticalEdge(c byte) bool {
	return c == '|' || c == '+'
}