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
	if m.num_rows == 0 || m.num_cols == 0 {
		return nil
	}
	
	var pairs []Pair
	
	for r := 0; r < m.num_rows; r++ {
		for c := 0; c < m.num_cols; c++ {
			item := m.rows[r][c]
			
			isRowMax := true
			for _, v := range m.rows[r] {
				if item < v {
					isRowMax = false
					break
				}
			}
			
			if !isRowMax {
				continue
			}
			
			isColMin := true
			for j := 0; j < m.num_rows; j++ {
				if item > m.rows[j][c] {
					isColMin = false
					break
				}
			}
			
			if isColMin {
				pairs = append(pairs, Pair{r, c})
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
	
	expectedCols := len(m.rows[0])
	for i := 1; i < m.num_rows; i++ {
		if len(m.rows[i]) != expectedCols {
			return false
		}
	}
	return true
}

func New(s string) (*Matrix, error) {
	s = strings.TrimSpace(s)
	if s == "" {
		return nil, errors.New("empty matrix")
	}
	
	rows := strings.Split(s, "\n")
	m := &Matrix{
		rows: make([][]int, 0, len(rows)),
	}
	
	for _, row := range rows {
		row = strings.TrimSpace(row)
		if row == "" {
			continue
		}
		
		elements := strings.Fields(row)
		newRow := make([]int, 0, len(elements))
		
		for _, element := range elements {
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			newRow = append(newRow, n)
		}
		m.rows = append(m.rows, newRow)
	}
	
	if len(m.rows) == 0 {
		return nil, errors.New("no valid rows")
	}
	
	m.num_rows = len(m.rows)
	m.num_cols = len(m.rows[0])
	
	if !SameDimensions(m) {
		return nil, errors.New("Matrix dimensions do not match")
	}
	
	return m, nil
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