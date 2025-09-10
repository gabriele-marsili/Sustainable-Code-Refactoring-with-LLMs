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
	pairs := []Pair{}
	rows := m.Rows()
	cols := m.Cols()

	for r, row := range rows {
		rowMax := row[0]
		rowMaxIndices := []int{0}
		for c, val := range row[1:] {
			if val > rowMax {
				rowMax = val
				rowMaxIndices = []int{c + 1}
			} else if val == rowMax {
				rowMaxIndices = append(rowMaxIndices, c+1)
			}
		}

		for _, c := range rowMaxIndices {
			colMin := cols[c][0]
			isSaddle := true
			for _, val := range cols[c][1:] {
				if val < colMin {
					colMin = val
				}
				if val < rowMax {
					isSaddle = false
					break
				}
			}
			if isSaddle && colMin == rowMax {
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

func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	matrixRows := make([][]int, len(rows))
	numCols := -1

	for i, row := range rows {
		elements := strings.Fields(row)
		if numCols == -1 {
			numCols = len(elements)
		} else if len(elements) != numCols {
			return nil, errors.New("Matrix dimensions do not match")
		}

		matrixRow := make([]int, len(elements))
		for j, element := range elements {
			n, err := strconv.Atoi(element)
			if err != nil {
				return nil, err
			}
			matrixRow[j] = n
		}
		matrixRows[i] = matrixRow
	}

	return &Matrix{
		rows:     matrixRows,
		num_rows: len(matrixRows),
		num_cols: numCols,
	}, nil
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