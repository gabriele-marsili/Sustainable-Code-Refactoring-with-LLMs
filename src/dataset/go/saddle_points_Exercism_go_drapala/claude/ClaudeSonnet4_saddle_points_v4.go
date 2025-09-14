package matrix

import (
	"errors"
	"strconv"
	"strings"
)

type Pair struct {
	row int
	col int
}

func (m *Matrix) Saddle() []Pair {
	rows := m.rows
	if len(rows) == 0 || len(rows[0]) == 0 {
		return nil
	}
	
	numRows := len(rows)
	numCols := len(rows[0])
	
	rowMaxs := make([]int, numRows)
	colMins := make([]int, numCols)
	
	for i := 0; i < numRows; i++ {
		rowMaxs[i] = rows[i][0]
		for j := 1; j < numCols; j++ {
			if rows[i][j] > rowMaxs[i] {
				rowMaxs[i] = rows[i][j]
			}
		}
	}
	
	for j := 0; j < numCols; j++ {
		colMins[j] = rows[0][j]
		for i := 1; i < numRows; i++ {
			if rows[i][j] < colMins[j] {
				colMins[j] = rows[i][j]
			}
		}
	}
	
	var pairs []Pair
	for i := 0; i < numRows; i++ {
		for j := 0; j < numCols; j++ {
			if rows[i][j] == rowMaxs[i] && rows[i][j] == colMins[j] {
				pairs = append(pairs, Pair{i, j})
			}
		}
	}
	
	return pairs
}

type Matrix struct {
	rows     [][]int
	num_rows int
	num_cols int
}

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

func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	if len(rows) == 0 {
		return nil, errors.New("empty matrix")
	}
	
	m := &Matrix{}
	m.rows = make([][]int, 0, len(rows))
	
	for _, row := range rows {
		row = strings.TrimSpace(row)
		if row == "" {
			continue
		}
		
		elements := strings.Fields(row)
		newRow := make([]int, len(elements))
		
		for i, element := range elements {
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			newRow[i] = n
		}
		m.rows = append(m.rows, newRow)
	}
	
	if len(m.rows) == 0 {
		return nil, errors.New("empty matrix")
	}
	
	m.num_rows = len(m.rows)
	m.num_cols = len(m.rows[0])
	
	if !SameDimensions(m) {
		return nil, errors.New("Matrix dimensions do not match")
	}
	
	return m, nil
}

func (m *Matrix) Rows() [][]int {
	result := make([][]int, m.num_rows)
	for i := 0; i < m.num_rows; i++ {
		result[i] = make([]int, m.num_cols)
		copy(result[i], m.rows[i])
	}
	return result
}

func (m *Matrix) Cols() [][]int {
	result := make([][]int, m.num_cols)
	for j := 0; j < m.num_cols; j++ {
		result[j] = make([]int, m.num_rows)
		for i := 0; i < m.num_rows; i++ {
			result[j][i] = m.rows[i][j]
		}
	}
	return result
}

func (m *Matrix) Set(row, col, val int) bool {
	if row < 0 || row >= m.num_rows || col < 0 || col >= m.num_cols {
		return false
	}
	m.rows[row][col] = val
	return true
}