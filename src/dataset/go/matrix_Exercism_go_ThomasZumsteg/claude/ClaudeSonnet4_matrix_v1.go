package matrix

import (
	"fmt"
	"strconv"
	"strings"
)

//Matrix stores an array of numbers in rows and columns
type Matrix struct {
	rows, cols int
	data       []int
}

/*New creates a matrix from a string.*/
func New(str string) (*Matrix, error) {
	if str == "" {
		return &Matrix{rows: 0, cols: 0, data: []int{}}, nil
	}
	
	rows := strings.Split(str, "\n")
	numRows := len(rows)
	
	// Pre-parse first row to determine dimensions
	firstRowCols := strings.Fields(strings.TrimSpace(rows[0]))
	numCols := len(firstRowCols)
	
	if numCols == 0 {
		return nil, fmt.Errorf("Rows need to be the same length")
	}
	
	// Pre-allocate data slice with exact capacity
	data := make([]int, 0, numRows*numCols)
	
	// Process first row
	for _, char := range firstRowCols {
		num, err := strconv.Atoi(char)
		if err != nil {
			return nil, err
		}
		data = append(data, num)
	}
	
	// Process remaining rows
	for i := 1; i < numRows; i++ {
		cols := strings.Fields(strings.TrimSpace(rows[i]))
		if len(cols) != numCols {
			return nil, fmt.Errorf("Rows need to be the same length")
		}
		for _, char := range cols {
			num, err := strconv.Atoi(char)
			if err != nil {
				return nil, err
			}
			data = append(data, num)
		}
	}
	
	return &Matrix{rows: numRows, cols: numCols, data: data}, nil
}

/*Rows gets the matrix represented in rows.*/
func (m Matrix) Rows() [][]int {
	if m.rows == 0 || m.cols == 0 {
		return [][]int{}
	}
	
	rows := make([][]int, m.rows)
	for r := 0; r < m.rows; r++ {
		start := r * m.cols
		end := start + m.cols
		rows[r] = make([]int, m.cols)
		copy(rows[r], m.data[start:end])
	}
	return rows
}

/*Cols gets the matrix represented in columns*/
func (m Matrix) Cols() [][]int {
	if m.rows == 0 || m.cols == 0 {
		return [][]int{}
	}
	
	cols := make([][]int, m.cols)
	for c := 0; c < m.cols; c++ {
		cols[c] = make([]int, m.rows)
		for r := 0; r < m.rows; r++ {
			cols[c][r] = m.data[r*m.cols+c]
		}
	}
	return cols
}

/*Set sets the value of the matrix at point row, col.*/
func (m *Matrix) Set(row, col, value int) bool {
	if row < 0 || row >= m.rows || col < 0 || col >= m.cols {
		return false
	}
	m.data[row*m.cols+col] = value
	return true
}