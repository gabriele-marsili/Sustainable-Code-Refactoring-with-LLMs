package minesweeper

import (
	"strconv"
	"strings"
)

// Annotate returns an annotated board
func Annotate(board []string) []string {
	if len(board) == 0 || len(board[0]) == 0 {
		return board
	}

	rows := len(board)
	cols := len(board[0])
	annotatedBoard := make([]string, rows)
	grid := make([][]byte, rows)

	for i := 0; i < rows; i++ {
		grid[i] = []byte(board[i])
		annotatedBoard[i] = board[i]
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