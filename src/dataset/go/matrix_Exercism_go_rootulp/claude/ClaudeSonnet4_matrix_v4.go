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
	
	firstRowCols := strings.Fields(rows[0])
	expectedCols := len(firstRowCols)
	
	grid := make([][]int, len(rows))
	
	for i, row := range rows {
		cols := strings.Fields(row)
		if len(cols) != expectedCols {
			return &Matrix{}, fmt.Errorf("uneven rows for %s", s)
		}
		
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
	for j := 0; j < cols; j++ {
		result[j] = make([]int, rows)
		for i := 0; i < rows; i++ {
			result[j][i] = m.grid[i][j]
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