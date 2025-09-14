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
	
	// Pre-allocate result slice with exact capacity
	result := make([]string, rows)
	
	// Convert strings to byte slices for faster manipulation
	grid := make([][]byte, rows)
	for i, row := range board {
		grid[i] = []byte(row)
	}
	
	// Process each cell
	for i := 0; i < rows; i++ {
		rowBytes := make([]byte, cols)
		copy(rowBytes, grid[i])
		
		for j := 0; j < cols; j++ {
			if grid[i][j] != '*' {
				mines := countNeighborMines(grid, i, j, rows, cols)
				if mines > 0 {
					rowBytes[j] = byte('0' + mines)
				}
			}
		}
		result[i] = string(rowBytes)
	}
	
	return result
}

func countNeighborMines(grid [][]byte, row, col, rows, cols int) int {
	count := 0
	
	// Check all 8 neighbors with bounds checking
	for r := max(0, row-1); r <= min(rows-1, row+1); r++ {
		for c := max(0, col-1); c <= min(cols-1, col+1); c++ {
			if (r != row || c != col) && grid[r][c] == '*' {
				count++
			}
		}
	}
	
	return count
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