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

	for i := 0; i < rows; i++ {
		grid[i] = []byte(board[i])
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

func (g *Game) AnnotatedBoard() []string {
	board := make([]string, g.rows)
	for i := 0; i < g.rows; i++ {
		board[i] = string(g.gridAnnotated[i])
	}
	return board
}

func (g *Game) Annotate() {
	directions := [][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, /*{0, 0},*/ {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	for row := 0; row < g.rows; row++ {
		for col := 0; col < g.cols; col++ {
			if g.grid[row][col] == '*' {
				continue
			}
			mines := 0
			for _, d := range directions {
				nr, nc := row+d[0], col+d[1]
				if nr >= 0 && nr < g.rows && nc >= 0 && nc < g.cols && g.grid[nr][nc] == '*' {
					mines++
				}
			}
			if mines > 0 {
				g.gridAnnotated[row][col] = byte('0' + mines)
			}
		}
	}
}