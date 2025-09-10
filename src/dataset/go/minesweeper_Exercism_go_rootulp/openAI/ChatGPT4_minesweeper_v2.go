package minesweeper

import (
	"strconv"
)

// Annotate returns an annotated board
func Annotate(board []string) []string {
	if len(board) == 0 || len(board[0]) == 0 {
		return board
	}

	grid := make([][]rune, len(board))
	for i := range board {
		grid[i] = []rune(board[i])
	}

	rows, cols := len(grid), len(grid[0])
	result := make([][]rune, rows)
	for i := range result {
		result[i] = make([]rune, cols)
		copy(result[i], grid[i])
	}

	directions := [][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, /*{0, 0},*/ {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if grid[row][col] == '*' {
				continue
			}
			mineCount := 0
			for _, d := range directions {
				nr, nc := row+d[0], col+d[1]
				if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '*' {
					mineCount++
				}
			}
			if mineCount > 0 {
				result[row][col] = rune('0' + mineCount)
			}
		}
	}

	annotatedBoard := make([]string, rows)
	for i := range result {
		annotatedBoard[i] = string(result[i])
	}
	return annotatedBoard
}