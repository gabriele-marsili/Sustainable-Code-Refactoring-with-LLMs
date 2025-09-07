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
						if grid[h][w] == '+' && grid[i][w] == '+' && grid[h][j] == '+' {
							horizontalOk := true
							for x := j + 1; x < w; x++ {
								if grid[i][x] != '-' && grid[i][x] != '+' {
									horizontalOk = false
									break
								}
								if grid[h][x] != '-' && grid[h][x] != '+' {
									horizontalOk = false
									break
								}
							}
							if horizontalOk {
								verticalOk := true
								for y := i + 1; y < h; y++ {
									if grid[y][j] != '|' && grid[y][j] != '+' {
										verticalOk = false
										break
									}
									if grid[y][w] != '|' && grid[y][w] != '+' {
										verticalOk = false
										break
									}
								}
								if verticalOk {
									total++
								}
							}
						}
					}
				}
			}
		}
	}
	return total
}