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
		return &Matrix{rows: 0, cols: 0, data: []int{}}, nil
	}

	var numCols int
	var data []int

	for i, row := range rows {
		row = strings.TrimSpace(row)
		if row == "" && i == numRows-1 {
			numRows--
			break
		}
		cols := strings.Split(row, " ")
		numColsForRow := 0
		for _, col := range cols {
			if col != "" {
				numColsForRow++
			}
		}

		if i == 0 {
			numCols = numColsForRow
			data = make([]int, 0, numRows*numCols)
		} else if numCols != numColsForRow {
			return nil, fmt.Errorf("Rows need to be the same length")
		}

		colIdx := 0
		for _, char := range cols {
			if char == "" {
				continue
			}
			num, err := strconv.Atoi(char)
			if err != nil {
				return nil, err
			}
			data = append(data, num)
			colIdx++
		}
	}

	matrix := &Matrix{rows: numRows, cols: numCols, data: data}
	return matrix, nil
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