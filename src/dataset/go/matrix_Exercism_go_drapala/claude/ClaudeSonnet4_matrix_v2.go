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

// Check dimensions of all rows are same
func SameDimensions(m *Matrix) bool {
	if m.num_rows == 0 {
		return true
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
	if s == "" {
		return nil, errors.New("empty input")
	}
	
	// Split by newline to get rows slice
	rows := strings.Split(s, "\n")
	numRows := len(rows)
	
	// Pre-allocate matrix rows
	matrixRows := make([][]int, 0, numRows)
	var numCols int
	
	// Loop over rows slice
	for i, row := range rows {
		// Trim leading and trailing spaces
		row = strings.TrimSpace(row)
		if row == "" {
			continue
		}
		
		// Split row into elements by splitting by space
		elements := strings.Fields(row) // More efficient than Split + TrimSpace
		
		if i == 0 {
			numCols = len(elements)
		} else if len(elements) != numCols {
			return nil, errors.New("Matrix dimensions do not match")
		}
		
		// Pre-allocate row slice
		newRow := make([]int, len(elements))
		
		// Convert elements to integers
		for j, element := range elements {
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			newRow[j] = n
		}
		
		matrixRows = append(matrixRows, newRow)
	}
	
	if len(matrixRows) == 0 {
		return nil, errors.New("no valid rows found")
	}
	
	// Create matrix
	m := &Matrix{
		rows:     matrixRows,
		num_rows: len(matrixRows),
		num_cols: numCols,
	}
	
	return m, nil
}

// Cols and Rows must return the results without affecting the matrix.
func (m *Matrix) Rows() [][]int {
	// Pre-allocate with known capacity
	rows := make([][]int, m.num_rows)
	
	for i, row := range m.rows {
		// Pre-allocate row with known length
		newRow := make([]int, m.num_cols)
		copy(newRow, row)
		rows[i] = newRow
	}
	return rows
}

// Loop over rows and return cols
func (m *Matrix) Cols() [][]int {
	// Pre-allocate with known capacity
	cols := make([][]int, m.num_cols)
	
	for i := 0; i < m.num_cols; i++ {
		// Pre-allocate column with known length
		newCol := make([]int, m.num_rows)
		for j := 0; j < m.num_rows; j++ {
			newCol[j] = m.rows[j][i]
		}
		cols[i] = newCol
	}
	return cols
}

func (m *Matrix) Set(row, col, val int) bool {
	// Bounds check
	if row < 0 || row >= m.num_rows || col < 0 || col >= m.num_cols {
		return false
	}
	m.rows[row][col] = val
	return true
}