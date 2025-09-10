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

type Game struct {
	grid          [][]string
	gridAnnotated [][]string
	rows          int
	cols          int
}

func NewGame(board []string) Game {
	rows := len(board)
	cols := len(board[0])
	grid := make([][]string, rows)
	gridAnnotated := make([][]string, rows)

	for i, row := range board {
		grid[i] = strings.Split(row, "")
		gridAnnotated[i] = make([]string, cols)
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
		board[i] = strings.Join(row, "")
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
			if isMine(g.grid[row][col]) {
				continue
			}
			mines := 0
			for _, dir := range directions {
				neighborRow, neighborCol := row+dir[0], col+dir[1]
				if neighborRow >= 0 && neighborRow < g.rows && neighborCol >= 0 && neighborCol < g.cols {
					if isMine(g.grid[neighborRow][neighborCol]) {
						mines++
					}
				}
			}
			if mines > 0 {
				g.gridAnnotated[row][col] = strconv.Itoa(mines)
			}
		}
	}
}

func isMine(cell string) bool {
	return cell == "*"
}