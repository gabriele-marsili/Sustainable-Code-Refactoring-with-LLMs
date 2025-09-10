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

// Create a new matrix from a string
func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	numRows := len(rows)
	if numRows == 0 {
		return &Matrix{rows: [][]int{}, num_rows: 0, num_cols: 0}, nil
	}

	var matrixRows [][]int
	numCols := -1

	for i, row := range rows {
		row = strings.TrimSpace(row)
		elements := strings.Split(row, " ")
		currentRow := make([]int, 0, len(elements)) // Pre-allocate

		for _, element := range elements {
			element = strings.TrimSpace(element)
			if element == "" {
				continue // Skip empty strings
			}
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			currentRow = append(currentRow, n)
		}

		if numCols == -1 {
			numCols = len(currentRow)
		} else if len(currentRow) != numCols {
			return nil, errors.New("matrix dimensions do not match")
		}

		matrixRows = append(matrixRows, currentRow)
	}

	m := &Matrix{
		rows:     matrixRows,
		num_rows: numRows,
		num_cols: numCols,
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
		for j := range m.rows {
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