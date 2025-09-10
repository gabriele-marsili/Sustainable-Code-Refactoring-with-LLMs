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

func SameDimensions(m *Matrix) bool {
	for i := 1; i < m.num_rows; i++ {
		if len(m.rows[i]) != m.num_cols {
			return false
		}
	}
	return true
}

func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	num_rows := len(rows)
	if num_rows == 0 {
		return nil, errors.New("empty matrix")
	}

	matrix := make([][]int, num_rows)
	var num_cols int

	for i, row := range rows {
		elements := strings.Fields(row)
		if i == 0 {
			num_cols = len(elements)
			if num_cols == 0 {
				return nil, errors.New("empty row")
			}
		} else if len(elements) != num_cols {
			return nil, errors.New("Matrix dimensions do not match")
		}

		matrix[i] = make([]int, num_cols)
		for j, element := range elements {
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			matrix[i][j] = n
		}
	}

	return &Matrix{
		rows:     matrix,
		num_rows: num_rows,
		num_cols: num_cols,
	}, nil
}

func (m *Matrix) Rows() [][]int {
	rows := make([][]int, m.num_rows)
	for i := 0; i < m.num_rows; i++ {
		rows[i] = append([]int(nil), m.rows[i]...)
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