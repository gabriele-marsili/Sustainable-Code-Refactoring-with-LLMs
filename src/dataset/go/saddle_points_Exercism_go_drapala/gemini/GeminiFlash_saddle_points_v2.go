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
	pairs := make([]Pair, 0)
	rows := m.Rows()
	cols := m.Cols()

	for r, row := range rows {
		for c, item := range row {
			isSaddle := true

			// Check if row is a saddle point
			for _, v := range row {
				if item < v {
					isSaddle = false
					break
				}
			}

			if !isSaddle {
				continue // Skip to the next column if not a row saddle point
			}

			// Check if col is a saddle point
			for _, v := range cols[c] {
				if item > v {
					isSaddle = false
					break
				}
			}

			if isSaddle {
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
		return true // Empty matrix is considered to have same dimensions
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

	matrix := make([][]int, numRows)
	numCols := -1

	for i, rowStr := range rows {
		rowStr = strings.TrimSpace(rowStr)
		elements := strings.Split(rowStr, " ")
		row := make([]int, 0, len(elements)) // Pre-allocate for efficiency

		for _, element := range elements {
			element = strings.TrimSpace(element)
			if element == "" {
				continue // Skip empty strings
			}
			num, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			row = append(row, num)
		}

		if numCols == -1 {
			numCols = len(row)
		} else if len(row) != numCols {
			return nil, errors.New("Matrix dimensions do not match")
		}

		matrix[i] = row
	}

	m := &Matrix{
		rows:     matrix,
		num_rows: numRows,
		num_cols: numCols,
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