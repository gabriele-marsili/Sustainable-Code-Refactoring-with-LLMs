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
							valid := true
							for x := i + 1; x < h; x++ {
								if grid[x][j] != '|' && grid[x][j] != '+' {
									valid = false
									break
								}
								if grid[x][w] != '|' && grid[x][w] != '+' {
									valid = false
									break
								}
							}
							if !valid {
								continue
							}
							for y := j + 1; y < w; y++ {
								if grid[i][y] != '-' && grid[i][y] != '+' {
									valid = false
									break
								}
								if grid[h][y] != '-' && grid[h][y] != '+' {
									valid = false
									break
								}
							}
							if valid {
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