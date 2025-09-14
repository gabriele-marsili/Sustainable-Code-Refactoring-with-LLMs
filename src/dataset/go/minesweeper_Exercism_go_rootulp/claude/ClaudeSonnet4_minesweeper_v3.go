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

	game := NewGame(board)
	game.Annotate()
	return game.AnnotatedBoard()
}

func noRows(board []string) bool {
	return len(board) == 0
}

func noColumns(board []string) bool {
	return len(board[0]) == 0
}

type Game struct {
	grid          [][]byte
	gridAnnotated [][]byte
	rows          int
	cols          int
}

func NewGame(board []string) Game {
	rows := len(board)
	cols := len(board[0])
	
	grid := make([][]byte, rows)
	gridAnnotated := make([][]byte, rows)

	for i, row := range board {
		grid[i] = []byte(row)
		gridAnnotated[i] = make([]byte, cols)
		copy(gridAnnotated[i], grid[i])
	}

	return Game{
		grid:          grid,
		gridAnnotated: gridAnnotated,
		rows:          rows,
		cols:          cols,
	}
}

func (g Game) AnnotatedBoard() []string {
	board := make([]string, g.rows)
	for i, row := range g.gridAnnotated {
		board[i] = string(row)
	}
	return board
}

func (g Game) Annotate() {
	for row_i := 0; row_i < g.rows; row_i++ {
		for col_i := 0; col_i < g.cols; col_i++ {
			if g.grid[row_i][col_i] == '*' {
				continue
			}
			mines := g.neighborMines(row_i, col_i)
			if mines > 0 {
				g.gridAnnotated[row_i][col_i] = byte('0' + mines)
			}
		}
	}
}

func (g Game) neighborMines(row_i, col_i int) int {
	mines := 0
	startRow := max(0, row_i-1)
	endRow := min(g.rows-1, row_i+1)
	startCol := max(0, col_i-1)
	endCol := min(g.cols-1, col_i+1)
	
	for row := startRow; row <= endRow; row++ {
		for col := startCol; col <= endCol; col++ {
			if row == row_i && col == col_i {
				continue
			}
			if g.grid[row][col] == '*' {
				mines++
			}
		}
	}
	return mines
}

func (g Game) getNeighbors(row_i, col_i int) (neighbors []string) {
	for row := row_i - 1; row <= row_i+1; row++ {
		for col := col_i - 1; col <= col_i+1; col++ {
			if row < 0 || col < 0 || row >= len(g.grid) || col >= len(g.grid[row]) {
				continue
			}
			if row == row_i && col == col_i {
				continue
			}
			neighbors = append(neighbors, string(g.grid[row][col]))
		}
	}
	return neighbors
}

func isMine(cell string) bool {
	return cell == "*"
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