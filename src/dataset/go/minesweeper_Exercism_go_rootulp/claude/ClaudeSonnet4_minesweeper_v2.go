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
	
	// Pre-allocate result slice with known capacity
	result := make([]string, rows)
	
	// Convert to byte slices for faster processing
	grid := make([][]byte, rows)
	for i, row := range board {
		grid[i] = []byte(row)
	}
	
	// Process each cell
	for i := 0; i < rows; i++ {
		rowBytes := make([]byte, cols)
		copy(rowBytes, grid[i])
		
		for j := 0; j < cols; j++ {
			if grid[i][j] == '*' {
				continue
			}
			
			mines := countNeighborMines(grid, i, j, rows, cols)
			if mines > 0 {
				rowBytes[j] = byte('0' + mines)
			}
		}
		result[i] = string(rowBytes)
	}
	
	return result
}

func countNeighborMines(grid [][]byte, row, col, rows, cols int) int {
	mines := 0
	
	startRow := max(0, row-1)
	endRow := min(rows-1, row+1)
	startCol := max(0, col-1)
	endCol := min(cols-1, col+1)
	
	for r := startRow; r <= endRow; r++ {
		for c := startCol; c <= endCol; c++ {
			if r == row && c == col {
				continue
			}
			if grid[r][c] == '*' {
				mines++
			}
		}
	}
	
	return mines
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