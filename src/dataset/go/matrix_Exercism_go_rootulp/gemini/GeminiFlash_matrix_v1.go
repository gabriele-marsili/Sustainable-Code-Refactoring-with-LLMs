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
		return &Matrix{grid: [][]int{}}, nil // Handle empty input
	}

	// Determine the number of columns in the first row
	firstRow := strings.TrimSpace(rows[0])
	colsStr := strings.Split(firstRow, " ")
	numCols := len(colsStr)

	// Pre-allocate the grid
	grid := make([][]int, numRows)
	for i := range grid {
		grid[i] = make([]int, numCols)
	}

	for i, row := range rows {
		row = strings.TrimSpace(row)
		colsStr := strings.Split(row, " ")

		if len(colsStr) != numCols {
			return nil, fmt.Errorf("uneven rows for %s", s)
		}

		for j, colStr := range colsStr {
			val, err := strconv.Atoi(colStr)
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
		numCols := len(m.grid[i])
		duplicate[i] = make([]int, numCols)
		copy(duplicate[i], m.grid[i])
	}
	return duplicate
}

func (m Matrix) Set(row int, column int, value int) bool {
	if row < 0 || row >= len(m.grid) {
		return false
	}
	if column < 0 || column >= len(m.grid[row]) {
		return false
	}
	m.grid[row][column] = value
	return true
}