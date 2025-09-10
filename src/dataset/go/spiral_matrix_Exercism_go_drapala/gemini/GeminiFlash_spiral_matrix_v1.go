package spiralmatrix

type matrix struct {
	dim       int
	grid      [][]int
	x         int
	y         int
	direction int // Use integer for direction: 0-right, 1-down, 2-left, 3-up
}

const (
	right = 0
	down  = 1
	left  = 2
	up    = 3
)

func (m *matrix) initZeros() {
	m.grid = make([][]int, m.dim)
	for i := range m.grid {
		m.grid[i] = make([]int, m.dim)
	}
}

func (m *matrix) move() {
	switch m.direction {
	case right:
		m.moveRight()
	case down:
		m.moveDown()
	case left:
		m.moveLeft()
	case up:
		m.moveUp()
	}
}

func (m *matrix) moveDown() {
	if m.y < m.dim-1 && m.grid[m.y+1][m.x] == 0 {
		m.y++
		return
	}
	m.direction = left
	m.x--
}

func (m *matrix) moveUp() {
	if m.y > 0 && m.grid[m.y-1][m.x] == 0 {
		m.y--
		return
	}
	m.direction = right
	m.x++
}

func (m *matrix) moveLeft() {
	if m.x > 0 && m.grid[m.y][m.x-1] == 0 {
		m.x--
		return
	}
	m.direction = up
	m.y--
}

func (m *matrix) moveRight() {
	if m.x < m.dim-1 && m.grid[m.y][m.x+1] == 0 {
		m.x++
		return
	}
	m.direction = down
	m.y++
}

func SpiralMatrix(size int) [][]int {
	if size == 0 {
		return [][]int{}
	}

	myGrid := matrix{dim: size, x: 0, y: 0, direction: right}
	myGrid.initZeros()

	num := 1
	for num <= size*size {
		myGrid.grid[myGrid.y][myGrid.x] = num
		myGrid.move()
		num++
	}

	return myGrid.grid
}