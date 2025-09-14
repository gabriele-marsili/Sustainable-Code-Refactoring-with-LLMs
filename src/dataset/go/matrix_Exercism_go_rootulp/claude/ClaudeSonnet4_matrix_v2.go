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
	if len(rows) == 0 {
		return &Matrix{}, nil
	}
	
	// Pre-allocate grid with known size
	grid := make([][]int, len(rows))
	var expectedCols int
	
	for i, row := range rows {
		trimmed := strings.Trim(row, " ")
		cols := strings.Split(trimmed, " ")
		
		// Check row length consistency
		if i == 0 {
			expectedCols = len(cols)
		} else if len(cols) != expectedCols {
			return &Matrix{}, fmt.Errorf("uneven rows for %s", s)
		}
		
		// Pre-allocate row with known size
		grid[i] = make([]int, len(cols))
		for j, col := range cols {
			val, err := strconv.Atoi(col)
			if err != nil {
				return &Matrix{}, err
			}
			grid[i][j] = val
		}
	}
	
	return &Matrix{grid: grid}, nil
}

func (m Matrix) Cols() [][]int {
	if len(m.grid) == 0 || len(m.grid[0]) == 0 {
		return [][]int{}
	}
	
	rows, cols := len(m.grid), len(m.grid[0])
	result := make([][]int, cols)
	for i := range result {
		result[i] = make([]int, rows)
	}
	
	for x, row := range m.grid {
		for y, val := range row {
			result[y][x] = val
		}
	}
	return result
}

func (m Matrix) Rows() [][]int {
	if len(m.grid) == 0 {
		return [][]int{}
	}
	
	duplicate := make([][]int, len(m.grid))
	for i, row := range m.grid {
		duplicate[i] = make([]int, len(row))
		copy(duplicate[i], row)
	}
	return duplicate
}

func (m Matrix) Set(row int, column int, value int) bool {
	if row < 0 || row >= len(m.grid) || column < 0 || len(m.grid) == 0 || column >= len(m.grid[0]) {
		return false
	}
	m.grid[row][column] = value
	return true
}