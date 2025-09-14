package spiralmatrix

func SpiralMatrix(size int) [][]int {
	if size == 0 {
		return [][]int{}
	}
	
	grid := make([][]int, size)
	for i := range grid {
		grid[i] = make([]int, size)
	}
	
	x, y := 0, 0
	dx, dy := 1, 0
	
	for num := 1; num <= size*size; num++ {
		grid[y][x] = num
		
		nextX, nextY := x+dx, y+dy
		if nextX < 0 || nextX >= size || nextY < 0 || nextY >= size || grid[nextY][nextX] != 0 {
			dx, dy = -dy, dx
		}
		x += dx
		y += dy
	}
	
	return grid
}