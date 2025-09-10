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
	pair := []Pair{}
	rows := m.Rows()
	cols := m.Cols()

	for r, row := range rows {
		rowMax := row[0]
		rowMaxIndices := []int{0}
		for c, val := range row[1:] {
			c += 1
			if val > rowMax {
				rowMax = val
				rowMaxIndices = []int{c}
			} else if val == rowMax {
				rowMaxIndices = append(rowMaxIndices, c)
			}
		}

		for _, c := range rowMaxIndices {
			isSaddle := true
			for _, val := range cols[c] {
				if val < rowMax {
					isSaddle = false
					break
				}
			}
			if isSaddle {
				pair = append(pair, Pair{r, c})
			}
		}
	}
	return pair
}

type Matrix struct {
	rows     [][]int
	num_rows int
	num_cols int
}

func SameDimensions(m *Matrix) bool {
	for _, row := range m.rows {
		if len(row) != m.num_cols {
			return false
		}
	}
	return true
}

func New(s string) (*Matrix, error) {
	var m Matrix
	rows := strings.Split(s, "\n")

	for _, row := range rows {
		row = strings.TrimSpace(row)
		elements := strings.Fields(row)
		new_row := make([]int, len(elements))
		for i, element := range elements {
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			new_row[i] = n
		}
		m.rows = append(m.rows, new_row)
	}

	m.num_rows = len(m.rows)
	if m.num_rows > 0 {
		m.num_cols = len(m.rows[0])
	}

	if !SameDimensions(&m) {
		return nil, errors.New("Matrix dimensions do not match")
	}

	return &m, nil
}

func (m *Matrix) Rows() [][]int {
	rows := make([][]int, len(m.rows))
	for i, row := range m.rows {
		rows[i] = append([]int(nil), row...)
	}
	return rows
}

func (m *Matrix) Cols() [][]int {
	cols := make([][]int, m.num_cols)
	for i := range cols {
		cols[i] = make([]int, m.num_rows)
		for j := range m.rows {
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