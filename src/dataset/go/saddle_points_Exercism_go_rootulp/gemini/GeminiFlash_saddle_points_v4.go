package matrix

import (
	"strconv"
	"strings"
)

type Matrix struct {
	grid [][]int
}

func (m *Matrix) String() string {
	var sb strings.Builder
	sb.WriteString("grid: ")
	sb.WriteString("[")
	for i, row := range m.grid {
		if i > 0 {
			sb.WriteString(" ")
		}
		sb.WriteString("[")
		for j, val := range row {
			if j > 0 {
				sb.WriteString(" ")
			}
			sb.WriteString(strconv.Itoa(val))
		}
		sb.WriteString("]")
	}
	sb.WriteString("]")
	return sb.String()
}

func (m *Matrix) isSaddle(x int, y int) bool {
	val := m.grid[y][x]
	return m.isMaxInRow(x, y, val) && m.isMinInCol(x, y, val)
}

func (m *Matrix) isMaxInRow(x int, y int, val int) bool {
	for _, i := range m.grid[y] {
		if val < i {
			return false
		}
	}
	return true
}

func (m *Matrix) isMinInCol(x int, y int, val int) bool {
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
			val, err := strconv.Atoi(c)
			if err != nil {
				return nil, err
			}
			row[j] = val
		}
		grid[i] = row
	}
	return &Matrix{grid: grid}, nil
}

func (m *Matrix) Saddle() (pairs []Pair) {
	pairs = make([]Pair, 0)
	rows := len(m.grid)
	if rows == 0 {
		return pairs
	}
	cols := len(m.grid[0])

	for y := 0; y < rows; y++ {
		for x := 0; x < cols; x++ {
			if m.isSaddle(x, y) {
				pairs = append(pairs, Pair{row: y, col: x})
			}
		}
	}
	return pairs
}