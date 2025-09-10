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

func (m *Matrix) isSaddle(x int, y int, rowMax []int, colMin []int) bool {
	val := m.grid[y][x]
	return val == rowMax[y] && val == colMin[x]
}

func (m *Matrix) calculateRowMax() []int {
	rowMax := make([]int, len(m.grid))
	for i, row := range m.grid {
		max := row[0]
		for _, val := range row {
			if val > max {
				max = val
			}
		}
		rowMax[i] = max
	}
	return rowMax
}

func (m *Matrix) calculateColMin() []int {
	if len(m.grid) == 0 {
		return nil
	}
	colMin := make([]int, len(m.grid[0]))
	for x := range colMin {
		min := m.grid[0][x]
		for y := range m.grid {
			if m.grid[y][x] < min {
				min = m.grid[y][x]
			}
		}
		colMin[x] = min
	}
	return colMin
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
	return &Matrix{grid}, nil
}

func (m *Matrix) Saddle() (pairs []Pair) {
	if len(m.grid) == 0 {
		return nil
	}

	rowMax := m.calculateRowMax()
	colMin := m.calculateColMin()

	for y, row := range m.grid {
		for x := range row {
			if m.isSaddle(x, y, rowMax, colMin) {
				pairs = append(pairs, Pair{row: y, col: x})
			}
		}
	}
	return pairs
}