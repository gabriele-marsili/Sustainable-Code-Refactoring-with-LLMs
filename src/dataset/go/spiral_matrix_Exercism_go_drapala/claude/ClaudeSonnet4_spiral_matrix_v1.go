package spiralmatrix

func SpiralMatrix(size int) [][]int {
	if size == 0 {
		return [][]int{}
	}
	
	// Pre-allocate the entire grid at once
	grid := make([][]int, size)
	for i := range grid {
		grid[i] = make([]int, size)
	}
	
	// Direction vectors: right, down, left, up
	dx := []int{1, 0, -1, 0}
	dy := []int{0, 1, 0, -1}
	
	x, y := 0, 0
	direction := 0 // 0=right, 1=down, 2=left, 3=up
	
	for num := 1; num <= size*size; num++ {
		grid[y][x] = num
		
		// Calculate next position
		nextX := x + dx[direction]
		nextY := y + dy[direction]
		
		// Check if we need to turn (hit boundary or filled cell)
		if nextX < 0 || nextX >= size || nextY < 0 || nextY >= size || grid[nextY][nextX] != 0 {
			direction = (direction + 1) % 4
			nextX = x + dx[direction]
			nextY = y + dy[direction]
		}
		
		x, y = nextX, nextY
	}
	
	return grid
}