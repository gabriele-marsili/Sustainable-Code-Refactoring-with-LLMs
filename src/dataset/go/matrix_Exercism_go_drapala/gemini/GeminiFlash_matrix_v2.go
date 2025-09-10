package matrix

import (
	"errors"
	"strconv"
	"strings"
)

// Define the Matrix type here.
type Matrix struct {
	rows     [][]int
	num_rows int
	num_cols int
}

// SameDimensions checks if all rows have the same length.
func (m *Matrix) SameDimensions() bool {
	if m.num_rows == 0 {
		return true // Empty matrix is considered to have consistent dimensions
	}
	firstRowLen := len(m.rows[0])
	for i := 1; i < m.num_rows; i++ {
		if len(m.rows[i]) != firstRowLen {
			return false
		}
	}
	return true
}

// New creates a new matrix from a string.
func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	numRows := len(rows)
	if numRows == 0 {
		return &Matrix{rows: [][]int{}, num_rows: 0, num_cols: 0}, nil
	}

	matrix := make([][]int, numRows)
	numCols := -1

	for i, row := range rows {
		row = strings.TrimSpace(row)
		elements := strings.Split(row, " ")
		numElements := len(elements)

		if numCols == -1 {
			numCols = numElements
		} else if numElements != numCols {
			return nil, errors.New("matrix dimensions do not match")
		}

		matrix[i] = make([]int, numCols)
		for j, element := range elements {
			n, err := strconv.Atoi(strings.TrimSpace(element))
			if err != nil {
				return nil, err
			}
			matrix[i][j] = n
		}
	}

	m := &Matrix{rows: matrix, num_rows: numRows, num_cols: numCols}
	if numRows > 0 && numCols == 0 {
		return nil, errors.New("matrix dimensions do not match")
	}

	return m, nil
}

// Rows returns a copy of the matrix rows.
func (m *Matrix) Rows() [][]int {
	rowsCopy := make([][]int, m.num_rows)
	for i := range m.rows {
		rowsCopy[i] = make([]int, m.num_cols)
		copy(rowsCopy[i], m.rows[i])
	}
	return rowsCopy
}

// Cols returns a copy of the matrix columns.
func (m *Matrix) Cols() [][]int {
	cols := make([][]int, m.num_cols)
	for i := range cols {
		cols[i] = make([]int, m.num_rows)
		for j := range m.rows {
			cols[i][j] = m.rows[j][i]
		}
	}
	return cols
}

// Set sets the value at the given row and column.
func (m *Matrix) Set(row, col, val int) bool {
	if row < 0 || row >= m.num_rows || col < 0 || col >= m.num_cols {
		return false
	}
	m.rows[row][col] = val
	return true
}