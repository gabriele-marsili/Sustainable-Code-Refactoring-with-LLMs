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
	
	return &Matrix{
		rows:     matrixRows,
		num_rows: len(matrixRows),
		num_cols: numCols,
	}, nil
}

func (m *Matrix) Rows() [][]int {
	rows := make([][]int, m.num_rows)
	for i, row := range m.rows {
		rows[i] = make([]int, len(row))
		copy(rows[i], row)
	}
	return rows
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