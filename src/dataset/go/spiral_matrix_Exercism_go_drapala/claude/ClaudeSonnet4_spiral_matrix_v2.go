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
	dx, dy := 1, 0 // direction vectors: right initially
	
	for num := 1; num <= size*size; num++ {
		grid[y][x] = num
		
		// Calculate next position
		nextX, nextY := x+dx, y+dy
		
		// Check if we need to turn (hit boundary or filled cell)
		if nextX < 0 || nextX >= size || nextY < 0 || nextY >= size || grid[nextY][nextX] != 0 {
			// Turn clockwise: right->down->left->up->right
			dx, dy = -dy, dx
		}
		
		x += dx
		y += dy
	}
	
	return grid
}