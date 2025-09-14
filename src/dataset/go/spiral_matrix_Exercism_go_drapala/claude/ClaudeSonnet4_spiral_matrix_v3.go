package spiralmatrix

type matrix struct {
	dim  int
	grid [][]int
	x    int
	y    int
	dir  int // 0=right, 1=down, 2=left, 3=up
}

var directions = [4][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}

func (m *matrix) initZeros() {
	m.grid = make([][]int, m.dim)
	for i := 0; i < m.dim; i++ {
		m.grid[i] = make([]int, m.dim)
	}
}

func (m *matrix) move() {
	dy, dx := directions[m.dir][0], directions[m.dir][1]
	nextY, nextX := m.y+dy, m.x+dx
	
	if nextY >= 0 && nextY < m.dim && nextX >= 0 && nextX < m.dim && m.grid[nextY][nextX] == 0 {
		m.y, m.x = nextY, nextX
	} else {
		m.dir = (m.dir + 1) % 4
		dy, dx = directions[m.dir][0], directions[m.dir][1]
		m.y, m.x = m.y+dy, m.x+dx
	}
}

func SpiralMatrix(size int) [][]int {
	if size == 0 {
		return [][]int{}
	}
	
	myGrid := matrix{dim: size, x: 0, y: 0, dir: 0}
	myGrid.initZeros()
	
	for num := 1; num <= size*size; num++ {
		myGrid.grid[myGrid.y][myGrid.x] = num
		if num < size*size {
			myGrid.move()
		}
	}
	
	return myGrid.grid
}