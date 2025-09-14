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
		if trimmed == "" {
			grid[i] = []int{}
			continue
		}
		
		cols := strings.Split(trimmed, " ")
		
		// Check for uneven rows during parsing
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
	
	// Pre-allocate all columns
	for i := range result {
		result[i] = make([]int, rows)
	}
	
	// Transpose in single pass
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			result[j][i] = m.grid[i][j]
		}
	}
	
	return result
}

func (m Matrix) Rows() [][]int {
	if len(m.grid) == 0 {
		return [][]int{}
	}
	
	// Pre-allocate with known dimensions
	duplicate := make([][]int, len(m.grid))
	for i, row := range m.grid {
		duplicate[i] = make([]int, len(row))
		copy(duplicate[i], row)
	}
	return duplicate
}

func (m Matrix) Set(row int, column int, value int) bool {
	if row < 0 || row >= len(m.grid) {
		return false
	}
	if column < 0 || column >= len(m.grid[0]) {
		return false
	}
	m.grid[row][column] = value
	return true
}

func isUnevenRows(s string) bool {
	rows := strings.Split(s, "\n")
	if len(rows) <= 1 {
		return false
	}
	
	firstRowLen := len(strings.Split(strings.Trim(rows[0], " "), " "))
	for i := 1; i < len(rows); i++ {
		if len(strings.Split(strings.Trim(rows[i], " "), " ")) != firstRowLen {
			return true
		}
	}
	return false
}

func initializeGrid(dy int, dx int) [][]int {
	result := make([][]int, dy)
	for i := range result {
		result[i] = make([]int, dx)
	}
	return result
}