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

	// Pre-calculate the number of columns based on the first row
	firstRow := strings.TrimSpace(rows[0])
	colsStr := strings.Split(firstRow, " ")
	numCols := len(colsStr)

	// Check for uneven rows early and avoid unnecessary allocations
	for _, row := range rows {
		cols := strings.Split(strings.TrimSpace(row), " ")
		if len(cols) != numCols {
			return nil, fmt.Errorf("uneven rows for %s", s)
		}
	}

	grid := make([][]int, numRows)
	for i := range grid {
		grid[i] = make([]int, numCols)
		row := strings.TrimSpace(rows[i])
		cols := strings.Split(row, " ")
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
		for j := range m.grid {
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

func isUnevenRows(s string) bool {
	rows := strings.Split(s, "\n")
	if len(rows) == 0 {
		return false // Empty input is considered even
	}

	firstRow := strings.TrimSpace(rows[0])
	numCols := len(strings.Split(firstRow, " "))

	for _, row := range rows {
		cols := strings.Split(strings.TrimSpace(row), " ")
		if len(cols) != numCols {
			return true
		}
	}
	return false
}