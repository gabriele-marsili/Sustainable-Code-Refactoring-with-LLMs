package rectangles

func Count(grid []string) int {
	if len(grid) == 0 {
		return 0
	}
	
	total := 0
	rows := len(grid)
	
	for i := 0; i < rows-1; i++ {
		cols := len(grid[i])
		if cols == 0 {
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
	for x := i + 1; x < h; x++ {
		if len(grid[x]) <= w {
			return false
		}
		leftChar := grid[x][j]
		rightChar := grid[x][w]
		if (leftChar != '|' && leftChar != '+') || 
			(rightChar != '|' && rightChar != '+') {
			return false
		}
	}
	
	for y := j + 1; y < w; y++ {
		if len(grid[i]) <= y || len(grid[h]) <= y {
			return false
		}
		topChar := grid[i][y]
		bottomChar := grid[h][y]
		if (topChar != '-' && topChar != '+') || 
			(bottomChar != '-' && bottomChar != '+') {
			return false
		}
	}
	
	return true
}