package matrix

import (
	"fmt"
	"strconv"
	"strings"
)

type Matrix struct {
	grid       [][]int
	rowMax     [][]int
	colMin     [][]int
	precomputed bool
}

func (m *Matrix) String() string {
	return fmt.Sprintf("grid: %v", m.grid)
}

func (m *Matrix) precompute() {
	if m.precomputed {
		return
	}
	rows, cols := len(m.grid), len(m.grid[0])
	m.rowMax = make([][]int, rows)
	m.colMin = make([][]int, cols)

	for y := 0; y < rows; y++ {
		m.rowMax[y] = make([]int, cols)
		maxVal := m.grid[y][0]
		for x := 0; x < cols; x++ {
			if m.grid[y][x] > maxVal {
				maxVal = m.grid[y][x]
			}
		}
		for x := 0; x < cols; x++ {
			m.rowMax[y][x] = maxVal
		}
	}

	for x := 0; x < cols; x++ {
		m.colMin[x] = make([]int, rows)
		minVal := m.grid[0][x]
		for y := 0; y < rows; y++ {
			if m.grid[y][x] < minVal {
				minVal = m.grid[y][x]
			}
		}
		for y := 0; y < rows; y++ {
			m.colMin[x][y] = minVal
		}
	}

	m.precomputed = true
}

func (m *Matrix) isSaddle(x int, y int) bool {
	m.precompute()
	return m.grid[y][x] == m.rowMax[y][x] && m.grid[y][x] == m.colMin[x][y]
}

type Pair struct {
	row int
	col int
}

func New(s string) (m *Matrix, err error) {
	grid := [][]int{}

	for _, line := range strings.Split(s, "\n") {
		row := []int{}
		for _, c := range strings.Fields(line) {
			i, err := strconv.Atoi(c)
			if err != nil {
				return nil, err
			}
			row = append(row, i)
		}
		grid = append(grid, row)
	}
	return &Matrix{grid: grid}, nil
}

func (m *Matrix) Saddle() (pairs []Pair) {
	m.precompute()
	for y, row := range m.grid {
		for x := range row {
			if m.isSaddle(x, y) {
				pairs = append(pairs, Pair{row: y, col: x})
			}
		}
	}
	return pairs
}