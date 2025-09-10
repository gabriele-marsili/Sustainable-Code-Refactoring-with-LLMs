package matrix

import (
	"fmt"
	"strconv"
	"strings"
)

// Matrix stores an array of numbers in rows and columns
type Matrix struct {
	rows, cols int
	data       []int
}

/*New creates a matrix from a string.*/
func New(str string) (*Matrix, error) {
	rows := strings.Split(str, "\n")
	numRows := len(rows)
	if numRows == 0 {
		return &Matrix{rows: 0, cols: 0, data: []int{}}, nil // Handle empty input
	}

	// Pre-allocate memory for the first row to determine the number of columns
	firstRow := strings.Split(strings.TrimSpace(rows[0]), " ")
	numCols := len(firstRow)

	// Pre-allocate memory for the entire data slice
	data := make([]int, 0, numRows*numCols)

	for _, char := range firstRow {
		num, err := strconv.Atoi(char)
		if err != nil {
			return nil, err
		}
		data = append(data, num)
	}

	for i := 1; i < numRows; i++ {
		row := strings.Split(strings.TrimSpace(rows[i]), " ")
		if len(row) != numCols {
			return nil, fmt.Errorf("Rows need to be the same length")
		}
		for _, char := range row {
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
	rows := make([][]int, m.rows)
	start := 0
	for r := 0; r < m.rows; r++ {
		rows[r] = make([]int, m.cols)
		copy(rows[r], m.data[start:start+m.cols])
		start += m.cols
	}
	return rows
}

/*Cols gets the matrix represented in columns*/
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

/*Set sets the value of the matrix at point row, col.*/
func (m *Matrix) Set(row, col, value int) bool {
	if row < 0 || row >= m.rows || col < 0 || col >= m.cols {
		return false
	}
	m.data[row*m.cols+col] = value
	return true
}