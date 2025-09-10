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

func (m *Matrix) isSaddle(x, y int) bool {
	val := m.grid[y][x]
	row := m.grid[y]

	for _, i := range row {
		if val < i {
			return false
		}
	}

	for _, row := range m.grid {
		if val > row[x] {
			return false
		}
	}

	return true
}

type Pair struct {
	row int
	col int
}

func New(s string) (*Matrix, error) {
	lines := strings.Split(s, "\n")
	grid := make([][]int, len(lines))

	for i, line := range lines {
		fields := strings.Fields(line)
		row := make([]int, len(fields))
		for j, c := range fields {
			val, err := strconv.Atoi(c)
			if err != nil {
				return nil, err
			}
			row[j] = val
		}
		grid[i] = row
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