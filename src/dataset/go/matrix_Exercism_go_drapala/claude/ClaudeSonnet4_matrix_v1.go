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
	
	rows := strings.Split(s, "\n")
	if len(rows) == 0 {
		return nil, errors.New("no rows found")
	}
	
	matrixRows := make([][]int, 0, len(rows))
	var numCols int
	
	for i, row := range rows {
		row = strings.TrimSpace(row)
		if row == "" {
			continue
		}
		
		elements := strings.Fields(row)
		if len(elements) == 0 {
			continue
		}
		
		if i == 0 {
			numCols = len(elements)
		} else if len(elements) != numCols {
			return nil, errors.New("Matrix dimensions do not match")
		}
		
		newRow := make([]int, len(elements))
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
	
	m := &Matrix{
		rows:     matrixRows,
		num_rows: len(matrixRows),
		num_cols: numCols,
	}
	
	return m, nil
}

// Cols and Rows must return the results without affecting the matrix.
func (m *Matrix) Rows() [][]int {
	rows := make([][]int, m.num_rows)
	for i := 0; i < m.num_rows; i++ {
		rows[i] = make([]int, m.num_cols)
		copy(rows[i], m.rows[i])
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