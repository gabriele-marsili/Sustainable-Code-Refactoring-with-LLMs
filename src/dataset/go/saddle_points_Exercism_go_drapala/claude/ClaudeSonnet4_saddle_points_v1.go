package matrix

import (
	"errors"
	"strconv"
	"strings"
)

// Matrix is copied from matrix.go at the end of this file.

// Pair:
// Contains row and column co-ordinates containing saddle points
type Pair struct {
	row int
	col int
}

func (m *Matrix) Saddle() []Pair {
	if m.num_rows == 0 || m.num_cols == 0 {
		return []Pair{}
	}
	
	// Pre-compute row maximums and column minimums
	rowMax := make([]int, m.num_rows)
	colMin := make([]int, m.num_cols)
	
	// Find row maximums
	for r := 0; r < m.num_rows; r++ {
		rowMax[r] = m.rows[r][0]
		for c := 1; c < m.num_cols; c++ {
			if m.rows[r][c] > rowMax[r] {
				rowMax[r] = m.rows[r][c]
			}
		}
	}
	
	// Find column minimums
	for c := 0; c < m.num_cols; c++ {
		colMin[c] = m.rows[0][c]
		for r := 1; r < m.num_rows; r++ {
			if m.rows[r][c] < colMin[c] {
				colMin[c] = m.rows[r][c]
			}
		}
	}
	
	// Find saddle points
	var pairs []Pair
	for r := 0; r < m.num_rows; r++ {
		for c := 0; c < m.num_cols; c++ {
			if m.rows[r][c] == rowMax[r] && m.rows[r][c] == colMin[c] {
				pairs = append(pairs, Pair{r, c})
			}
		}
	}
	
	return pairs
}

// #############################################################################
// 								COPIED FROM MATRIX.GO
// #############################################################################

// Define the Matrix type here.
type Matrix struct {
	rows     [][]int
	num_rows int
	num_cols int
}

// Check dimensions of all rows and cols are same
func SameDimensions(m *Matrix) bool {
	if m.num_rows == 0 {
		return true
	}
	
	expectedCols := len(m.rows[0])
	for i := 1; i < m.num_rows; i++ {
		if len(m.rows[i]) != expectedCols {
			return false
		}
	}
	return true
}

// Create a new matrix from a string
func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	if len(rows) == 0 {
		return nil, errors.New("Empty matrix")
	}
	
	m := Matrix{
		rows: make([][]int, 0, len(rows)),
	}
	
	for _, row := range rows {
		row = strings.TrimSpace(row)
		if row == "" {
			continue
		}
		
		elements := strings.Fields(row)
		newRow := make([]int, 0, len(elements))
		
		for _, element := range elements {
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			newRow = append(newRow, n)
		}
		m.rows = append(m.rows, newRow)
	}
	
	if len(m.rows) == 0 {
		return nil, errors.New("Empty matrix")
	}
	
	m.num_rows = len(m.rows)
	m.num_cols = len(m.rows[0])
	
	if !SameDimensions(&m) {
		return nil, errors.New("Matrix dimensions do not match")
	}
	
	return &m, nil
}

// Cols and Rows must return the results without affecting the matrix.
func (m *Matrix) Rows() [][]int {
	rows := make([][]int, m.num_rows)
	for i, row := range m.rows {
		rows[i] = make([]int, len(row))
		copy(rows[i], row)
	}
	return rows
}

// Loop over rows and return cols
func (m *Matrix) Cols() [][]int {
	cols := make([][]int, m.num_cols)
	for i := 0; i < m.num_cols; i++ {
		cols[i] = make([]int, m.num_rows)
		for j := 0; j < m.num_rows; j++ {
			cols[i][j] = m.rows[j][i]
		}
	}
	return cols
}

func (m *Matrix) Set(row, col, val int) bool {
	if row < 0 || row >= m.num_rows || col < 0 || col >= m.num_cols {
		return false
	}
	m.rows[row][col] = val
	return true
}