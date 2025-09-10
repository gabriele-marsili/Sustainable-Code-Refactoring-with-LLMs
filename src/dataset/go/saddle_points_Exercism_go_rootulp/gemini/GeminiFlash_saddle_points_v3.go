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

func (m *Matrix) isSaddle(x int, y int, maxInRow []int, minInCol []int) bool {
	val := m.grid[y][x]
	return val == maxInRow[y] && val == minInCol[x]
}

type Pair struct {
	row int
	col int
}

func New(s string) (m *Matrix, err error) {
	rows := strings.Split(s, "\n")
	grid := make([][]int, len(rows))

	for i, line := range rows {
		nums := strings.Fields(line)
		row := make([]int, len(nums))
		for j, numStr := range nums {
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

func (m *Matrix) Saddle() (pairs []Pair) {
	rows := len(m.grid)
	if rows == 0 {
		return []Pair{}
	}
	cols := len(m.grid[0])

	maxInRow := make([]int, rows)
	minInCol := make([]int, cols)

	for i := 0; i < rows; i++ {
		maxVal := m.grid[i][0]
		for j := 1; j < cols; j++ {
			if m.grid[i][j] > maxVal {
				maxVal = m.grid[i][j]
			}
		}
		maxInRow[i] = maxVal
	}

	for j := 0; j < cols; j++ {
		minVal := m.grid[0][j]
		for i := 1; i < rows; i++ {
			if m.grid[i][j] < minVal {
				minVal = m.grid[i][j]
			}
		}
		minInCol[j] = minVal
	}

	for y := 0; y < rows; y++ {
		for x := 0; x < cols; x++ {
			if m.isSaddle(x, y, maxInRow, minInCol) {
				pairs = append(pairs, Pair{row: y, col: x})
			}
		}
	}

	return pairs
}