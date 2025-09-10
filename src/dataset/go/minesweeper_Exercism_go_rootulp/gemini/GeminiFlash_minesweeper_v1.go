package minesweeper

import (
	"strconv"
)

// Annotate returns an annotated board
func Annotate(board []string) []string {
	rows := len(board)
	if rows == 0 {
		return board
	}

	cols := len(board[0])
	if cols == 0 {
		return board
	}

	annotatedBoard := make([]string, rows)
	grid := make([][]byte, rows)

	for i := 0; i < rows; i++ {
		grid[i] = []byte(board[i])
		annotatedBoard[i] = board[i] // Initialize with original row
	}

	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			if grid[i][j] == '*' {
				continue
			}

			mines := 0
			for row := i - 1; row <= i+1; row++ {
				for col := j - 1; col <= j+1; col++ {
					if row < 0 || col < 0 || row >= rows || col >= cols || (row == i && col == j) {
						continue
					}
					if grid[row][col] == '*' {
						mines++
					}
				}
			}

			if mines > 0 {
				annotatedBoard[i] = annotatedBoard[i][:j] + strconv.Itoa(mines) + annotatedBoard[i][j+1:]
			}
		}
	}

	return annotatedBoard
}