package matrix

import (
	"fmt"
	"strconv"
	"strings"
)

type Matrix struct {
	grid [][]int
}

func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	grid := make([][]int, len(rows))
	rowLength := -1

	for i, row := range rows {
		cols := strings.Fields(row)
		if rowLength == -1 {
			rowLength = len(cols)
		} else if len(cols) != rowLength {
			return nil, fmt.Errorf("uneven rows for %s", s)
		}

		grid[i] = make([]int, len(cols))
		for j, col := range cols {
			val, err := strconv.Atoi(col)
			if err != nil {
				return nil, err
			}
			grid[i][j] = val
		}
	}
	return &Matrix{grid: grid}, nil
}

func (m Matrix) Cols() [][]int {
	if len(m.grid) == 0 {
		return nil
	}
	rows, cols := len(m.grid), len(m.grid[0])
	result := make([][]int, cols)
	for i := range result {
		result[i] = make([]int, rows)
	}
	for i, row := range m.grid {
		for j, val := range row {
			result[j][i] = val
		}
	}
	return result
}

func (m Matrix) Rows() [][]int {
	rows := make([][]int, len(m.grid))
	for i, row := range m.grid {
		rows[i] = append([]int(nil), row...)
	}
	return rows
}

func (m *Matrix) Set(row int, column int, value int) bool {
	if row < 0 || row >= len(m.grid) || column < 0 || column >= len(m.grid[0]) {
		return false
	}
	m.grid[row][column] = value
	return true
}