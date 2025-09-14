package matrix

import (
	"errors"
	"strconv"
	"strings"
)

type Matrix struct {
	rows     [][]int
	num_rows int
	num_cols int
}

func New(s string) (*Matrix, error) {
	if s == "" {
		return nil, errors.New("empty input")
	}
	
	rows := strings.Split(s, "\n")
	if len(rows) == 0 {
		return nil, errors.New("no rows found")
	}
	
	m := &Matrix{
		rows: make([][]int, 0, len(rows)),
	}
	
	var expectedCols int
	
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
			expectedCols = len(elements)
		} else if len(elements) != expectedCols {
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
		m.rows = append(m.rows, newRow)
	}
	
	if len(m.rows) == 0 {
		return nil, errors.New("no valid rows found")
	}
	
	m.num_rows = len(m.rows)
	m.num_cols = len(m.rows[0])
	
	return m, nil
}

func (m *Matrix) Rows() [][]int {
	result := make([][]int, m.num_rows)
	for i := range m.rows {
		result[i] = make([]int, m.num_cols)
		copy(result[i], m.rows[i])
	}
	return result
}

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