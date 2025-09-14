package matrix

import (
	"fmt"
	"strconv"
	"strings"
)

type Matrix struct {
	grid [][]int
}

func (m *Matrix) String() string {
	return fmt.Sprintf("grid: %v", m.grid)
}

func (m *Matrix) isSaddle(x int, y int) bool {
	val := m.grid[y][x]
	
	// Check if it's max in row
	for _, i := range m.grid[y] {
		if val < i {
			return false
		}
	}
	
	// Check if it's min in column
	for i := 0; i < len(m.grid); i++ {
		if val > m.grid[i][x] {
			return false
		}
	}
	
	return true
}

type Pair struct {
	row int
	col int
}

func New(s string) (m *Matrix, err error) {
	lines := strings.Split(s, "\n")
	grid := make([][]int, 0, len(lines))

	for _, line := range lines {
		fields := strings.Fields(line)
		row := make([]int, 0, len(fields))
		for _, c := range fields {
			i, err := strconv.Atoi(c)
			if err != nil {
				return nil, err
			}
			row = append(row, i)
		}
		grid = append(grid, row)
	}
	return &Matrix{grid}, nil
}

func (m *Matrix) Saddle() []Pair {
	var pairs []Pair

	for y, row := range m.grid {
		for x := range row {
			if m.isSaddle(x, y) {
				pairs = append(pairs, Pair{row: y, col: x})
			}
		}
	}
	return pairs
}