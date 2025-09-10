package matrix

import (
	"errors"
	"strconv"
	"strings"
)

// Matrix stores an array of numbers in rows and columns
type Matrix struct {
	rows, cols int
	data       []int
}

// New creates a matrix from a string.
func New(str string) (*Matrix, error) {
	rows := strings.Split(strings.TrimSpace(str), "\n")
	rowCount := len(rows)
	if rowCount == 0 {
		return nil, errors.New("input string is empty")
	}

	matrix := Matrix{rows: rowCount}
	for _, row := range rows {
		cols := strings.Fields(row)
		if matrix.cols == 0 {
			matrix.cols = len(cols)
		} else if matrix.cols != len(cols) {
			return nil, errors.New("rows need to be the same length")
		}
		for _, char := range cols {
			num, err := strconv.Atoi(char)
			if err != nil {
				return nil, err
			}
			matrix.data = append(matrix.data, num)
		}
	}
	return &matrix, nil
}

// Rows gets the matrix represented in rows.
func (m Matrix) Rows() [][]int {
	rows := make([][]int, m.rows)
	for r := 0; r < m.rows; r++ {
		start := r * m.cols
		rows[r] = m.data[start : start+m.cols]
	}
	return rows
}

// Cols gets the matrix represented in columns.
func (m Matrix) Cols() [][]int {
	cols := make([][]int, m.cols)
	for c := 0; c < m.cols; c++ {
		col := make([]int, m.rows)
		for r := 0; r < m.rows; r++ {
			col[r] = m.data[r*m.cols+c]
		}
		cols[c] = col
	}
	return cols
}

// Set sets the value of the matrix at point row, col.
func (m *Matrix) Set(row, col, value int) bool {
	if row < 0 || row >= m.rows || col < 0 || col >= m.cols {
		return false
	}
	m.data[row*m.cols+col] = value
	return true
}