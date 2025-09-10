package spiralmatrix

type matrix struct {
	dim       int
	grid      [][]int
	x, y      int
	direction int // 0: right, 1: down, 2: left, 3: up
}

func (m *matrix) initZeros() {
	m.grid = make([][]int, m.dim)
	for i := range m.grid {
		m.grid[i] = make([]int, m.dim)
	}
}

func (m *matrix) move() {
	switch m.direction {
	case 0: // right
		if m.x < m.dim-1 && m.grid[m.y][m.x+1] == 0 {
			m.x++
		} else {
			m.direction = 1
			m.y++
		}
	case 1: // down
		if m.y < m.dim-1 && m.grid[m.y+1][m.x] == 0 {
			m.y++
		} else {
			m.direction = 2
			m.x--
		}
	case 2: // left
		if m.x > 0 && m.grid[m.y][m.x-1] == 0 {
			m.x--
		} else {
			m.direction = 3
			m.y--
		}
	case 3: // up
		if m.y > 0 && m.grid[m.y-1][m.x] == 0 {
			m.y--
		} else {
			m.direction = 0
			m.x++
		}
	}
}

func SpiralMatrix(size int) [][]int {
	if size == 0 {
		return [][]int{}
	}
	myGrid := matrix{dim: size, direction: 0}
	myGrid.initZeros()
	for num := 1; num <= size*size; num++ {
		myGrid.grid[myGrid.y][myGrid.x] = num
		myGrid.move()
	}
	return myGrid.grid
}