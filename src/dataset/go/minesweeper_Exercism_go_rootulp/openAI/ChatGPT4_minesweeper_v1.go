package minesweeper

import (
	"strconv"
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

type Game struct {
	grid          [][]rune
	gridAnnotated [][]rune
}

func NewGame(board []string) Game {
	grid := make([][]rune, len(board))
	gridAnnotated := make([][]rune, len(board))

	for i, row := range board {
		grid[i] = []rune(row)
		gridAnnotated[i] = []rune(row)
	}

	return Game{
		grid:          grid,
		gridAnnotated: gridAnnotated,
	}
}

func (g Game) AnnotatedBoard() []string {
	board := make([]string, len(g.gridAnnotated))
	for i, row := range g.gridAnnotated {
		board[i] = string(row)
	}
	return board
}

func (g Game) Annotate() {
	directions := [][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, /*{0, 0},*/ {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	for row_i, row := range g.grid {
		for col_i, cell := range row {
			if cell == '*' {
				continue
			}
			mines := 0
			for _, dir := range directions {
				neighborRow, neighborCol := row_i+dir[0], col_i+dir[1]
				if neighborRow >= 0 && neighborRow < len(g.grid) &&
					neighborCol >= 0 && neighborCol < len(g.grid[0]) &&
					g.grid[neighborRow][neighborCol] == '*' {
					mines++
				}
			}
			if mines > 0 {
				g.gridAnnotated[row_i][col_i] = rune('0' + mines)
			}
		}
	}
}