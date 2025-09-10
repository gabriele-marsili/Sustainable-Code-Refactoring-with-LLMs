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

// Check dimensions of all rows and cols are same
func SameDimensions(m *Matrix) bool {
	if m.num_rows == 0 {
		return true
	}
	firstRowLen := len(m.rows[0])
	for i := 1; i < m.num_rows; i++ {
		if len(m.rows[i]) != firstRowLen {
			return false
		}
	}
	return true
}

// Create a new matrix from a string
func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	numRows := len(rows)
	if numRows == 0 {
		return &Matrix{rows: [][]int{}, num_rows: 0, num_cols: 0}, nil
	}

	var matrixRows [][]int
	var numCols int

	for i, row := range rows {
		row = strings.TrimSpace(row)
		elements := strings.Split(row, " ")
		newRow := make([]int, 0, len(elements))
		for _, element := range elements {
			element = strings.TrimSpace(element)
			if element == "" {
				continue
			}
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			newRow = append(newRow, n)
		}

		if i == 0 {
			numCols = len(newRow)
		} else if len(newRow) != numCols {
			return nil, errors.New("Matrix dimensions do not match")
		}

		matrixRows = append(matrixRows, newRow)
	}

	m := &Matrix{rows: matrixRows, num_rows: numRows, num_cols: numCols}

	if !SameDimensions(m) {
		return nil, errors.New("Matrix dimensions do not match")
	}

	return m, nil
}

// Cols and Rows must return the results without affecting the matrix.
func (m *Matrix) Rows() [][]int {
	rowsCopy := make([][]int, m.num_rows)
	for i := range m.rows {
		rowsCopy[i] = make([]int, m.num_cols)
		copy(rowsCopy[i], m.rows[i])
	}
	return rowsCopy
}

// Loop over rows and return cols
func (m *Matrix) Cols() [][]int {
	cols := make([][]int, m.num_cols)
	for i := range cols {
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