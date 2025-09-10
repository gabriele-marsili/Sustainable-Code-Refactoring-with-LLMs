package spiralmatrix

type matrix struct {
	dim       int
	grid      [][]int
	x, y      int    // current position
	direction int    // 0: right, 1: down, 2: left, 3: up
}

// Initialize the matrix with all zeros
func (m *matrix) initZeros() {
	m.grid = make([][]int, m.dim)
	for i := range m.grid {
		m.grid[i] = make([]int, m.dim)
	}
}

// Move logic
func (m *matrix) move() {
	dx := []int{1, 0, -1, 0} // right, down, left, up
	dy := []int{0, 1, 0, -1}

	nx, ny := m.x+dx[m.direction], m.y+dy[m.direction]
	if nx >= 0 && nx < m.dim && ny >= 0 && ny < m.dim && m.grid[ny][nx] == 0 {
		m.x, m.y = nx, ny
	} else {
		m.direction = (m.direction + 1) % 4 // Change direction
		m.x, m.y = m.x+dx[m.direction], m.y+dy[m.direction]
	}
}

func SpiralMatrix(size int) [][]int {
	if size <= 0 {
		return [][]int{}
	}
	myGrid := matrix{dim: size, direction: 0} // Starting direction is right
	myGrid.initZeros()

	for num := 1; num <= size*size; num++ {
		myGrid.grid[myGrid.y][myGrid.x] = num
		myGrid.move()
	}
	return myGrid.grid
}