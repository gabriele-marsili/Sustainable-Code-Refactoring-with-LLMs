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
		return true // Empty matrix is considered valid
	}
	expectedCols := m.num_cols
	for i := 0; i < m.num_rows; i++ {
		if len(m.rows[i]) != expectedCols {
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

	firstRow := strings.Fields(strings.TrimSpace(rows[0]))
	numCols := len(firstRow)

	m := &Matrix{
		rows:     make([][]int, numRows),
		num_rows: numRows,
		num_cols: numCols,
	}

	for i, row := range rows {
		row = strings.TrimSpace(row)
		elements := strings.Fields(row)

		if len(elements) != numCols {
			return nil, errors.New("Matrix dimensions do not match")
		}

		m.rows[i] = make([]int, numCols)
		for j, element := range elements {
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			m.rows[i][j] = n
		}
	}

	return m, nil
}

// Cols and Rows must return the results without affecting the matrix.
func (m *Matrix) Rows() [][]int {
	rows := make([][]int, m.num_rows)
	for i := range m.rows {
		rows[i] = make([]int, m.num_cols)
		copy(rows[i], m.rows[i])
	}
	return rows
}

// Loop over rows and return cols
func (m *Matrix) Cols() [][]int {
	cols := make([][]int, m.num_cols)
	for i := range cols {
		cols[i] = make([]int, m.num_rows)
		for j := range cols[i] {
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