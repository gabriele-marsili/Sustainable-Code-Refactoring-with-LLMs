package minesweeper

import (
	"strconv"
)

// Annotate returns an annotated board
func Annotate(board []string) []string {
	if len(board) == 0 || len(board[0]) == 0 {
		return board
	}

	rows := len(board)
	cols := len(board[0])
	
	result := make([]string, rows)
	for i := 0; i < rows; i++ {
		result[i] = board[i]
	}
	
	resultBytes := make([][]byte, rows)
	for i := 0; i < rows; i++ {
		resultBytes[i] = []byte(result[i])
	}
	
	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if board[row][col] == '*' {
				continue
			}
			
			mines := 0
			for r := max(0, row-1); r <= min(rows-1, row+1); r++ {
				for c := max(0, col-1); c <= min(cols-1, col+1); c++ {
					if r == row && c == col {
						continue
					}
					if board[r][c] == '*' {
						mines++
					}
				}
			}
			
			if mines > 0 {
				resultBytes[row][col] = byte('0' + mines)
			}
		}
	}
	
	for i := 0; i < rows; i++ {
		result[i] = string(resultBytes[i])
	}
	
	return result
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}