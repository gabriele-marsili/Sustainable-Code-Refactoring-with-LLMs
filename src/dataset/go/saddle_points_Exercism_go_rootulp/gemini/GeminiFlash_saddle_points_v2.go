package matrix

import (
	"fmt"
	"strconv"
	"strings"
)

type Matrix struct {
	grid [][]int
}

func (m *Matrix) String() string {
	return fmt.Sprintf("grid: %v", m.grid)
}

func (m *Matrix) isSaddle(x int, y int, rowMax []int, colMin []int) bool {
	return m.grid[y][x] == rowMax[y] && m.grid[y][x] == colMin[x]
}

type Pair struct {
	row int
	col int
}

func New(s string) (*Matrix, error) {
	rows := strings.Split(s, "\n")
	grid := make([][]int, len(rows))

	for i, rowStr := range rows {
		numsStr := strings.Fields(rowStr)
		row := make([]int, len(numsStr))
		for j, numStr := range numsStr {
			num, err := strconv.Atoi(numStr)
			if err != nil {
				return nil, err
			}
			row[j] = num
		}
		grid[i] = row
	}

	return &Matrix{grid: grid}, nil
}

func (m *Matrix) Saddle() []Pair {
	rows := len(m.grid)
	if rows == 0 {
		return []Pair{}
	}
	cols := len(m.grid[0])

	rowMax := make([]int, rows)
	for i := range rows {
		rowMax[i] = m.grid[i][0]
		for j := 1; j < cols; j++ {
			if m.grid[i][j] > rowMax[i] {
				rowMax[i] = m.grid[i][j]
			}
		}
	}

	colMin := make([]int, cols)
	for j := range cols {
		colMin[j] = m.grid[0][j]
		for i := 1; i < rows; i++ {
			if m.grid[i][j] < colMin[j] {
				colMin[j] = m.grid[i][j]
			}
		}
	}

	pairs := []Pair{}
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			if m.isSaddle(j, i, rowMax, colMin) {
				pairs = append(pairs, Pair{row: i, col: j})
			}
		}
	}
	return pairs
}