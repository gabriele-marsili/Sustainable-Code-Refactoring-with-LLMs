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
	numRows := len(rows)
	if numRows == 0 {
		return &Matrix{grid: [][]int{}}, nil
	}

	firstRow := strings.Split(strings.TrimSpace(rows[0]), " ")
	numCols := len(firstRow)

	grid := make([][]int, numRows)
	for i := range grid {
		grid[i] = make([]int, numCols)
	}

	for i, row := range rows {
		cols := strings.Split(strings.TrimSpace(row), " ")
		if len(cols) != numCols {
			return nil, fmt.Errorf("uneven rows for %s", s)
		}
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
	numRows := len(m.grid)
	if numRows == 0 {
		return [][]int{}
	}
	numCols := len(m.grid[0])

	result := make([][]int, numCols)
	for i := range result {
		result[i] = make([]int, numRows)
		for j := range result[i] {
			result[i][j] = m.grid[j][i]
		}
	}
	return result
}

func (m Matrix) Rows() [][]int {
	numRows := len(m.grid)
	duplicate := make([][]int, numRows)
	for i := range m.grid {
		rowLen := len(m.grid[i])
		duplicate[i] = make([]int, rowLen)
		copy(duplicate[i], m.grid[i])
	}
	return duplicate
}

func (m Matrix) Set(row int, column int, value int) bool {
	if row < 0 || row >= len(m.grid) {
		return false
	}
	if len(m.grid) > 0 && (column < 0 || column >= len(m.grid[0])) {
		return false
	}

	m.grid[row][column] = value
	return true
}

func isUnevenRows(s string) bool {
	rows := strings.Split(s, "\n")
	if len(rows) == 0 {
		return false
	}
	firstRowLen := len(strings.Split(strings.TrimSpace(rows[0]), " "))
	for _, row := range rows[1:] {
		if len(strings.Split(strings.TrimSpace(row), " ")) != firstRowLen {
			return true
		}
	}
	return false
}

func initializeGrid(dy int, dx int) (grid [][]int) {
	grid = make([][]int, dy)
	for i := range grid {
		grid[i] = make([]int, dx)
	}
	return
}