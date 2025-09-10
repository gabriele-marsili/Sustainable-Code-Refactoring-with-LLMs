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
	return m.isMaxInRow(val, y) && m.isMinInCol(val, x)
}

func (m *Matrix) isMaxInRow(val, y int) bool {
	for _, i := range m.grid[y] {
		if val < i {
			return false
		}
	}
	return true
}

func (m *Matrix) isMinInCol(val, x int) bool {
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

func New(s string) (m *Matrix, err error) {
	lines := strings.Split(s, "\n")
	grid := make([][]int, len(lines))

	for i, line := range lines {
		fields := strings.Fields(line)
		row := make([]int, len(fields))
		for j, c := range fields {
			row[j], err = strconv.Atoi(c)
			if err != nil {
				return nil, err
			}
		}
		grid[i] = row
	}
	return &Matrix{grid}, nil
}

func (m *Matrix) Saddle() (pairs []Pair) {
	for y, row := range m.grid {
		for x, val := range row {
			if m.isMaxInRow(val, y) && m.isMinInCol(val, x) {
				pairs = append(pairs, Pair{row: y, col: x})
			}
		}
	}
	return pairs
}