package stateoftictactoe

import (
	"errors"
	"strings"
)

type State string

const (
	Win     State = "win"
	Ongoing State = "ongoing"
	Draw    State = "draw"
)

func StateOfTicTacToe(board []string) (State, error) {
	game := NewGame(board)
	return game.getState()
}

type game struct {
	grid   [][]string
	countX int
	countO int
}

func NewGame(board []string) *game {
	grid := make([][]string, len(board))
	countX, countO := 0, 0
	for i, row := range board {
		grid[i] = strings.Split(row, "")
		for _, cell := range grid[i] {
			if cell == "X" {
				countX++
			} else if cell == "O" {
				countO++
			}
		}
	}
	return &game{grid: grid, countX: countX, countO: countO}
}

func (g *game) getState() (State, error) {
	if err := g.isInvalidBoard(); err != nil {
		return "", err
	}
	if g.isWin("X") || g.isWin("O") {
		return Win, nil
	}
	if g.isOver() {
		return Draw, nil
	}
	return Ongoing, nil
}

func (g *game) isWin(player string) bool {
	return g.isWinByRow(player) || g.isWinByColumn(player) || g.isWinByDiagonal(player)
}

func (g *game) isWinByRow(player string) bool {
	for _, row := range g.grid {
		if row[0] == player && row[1] == player && row[2] == player {
			return true
		}
	}
	return false
}

func (g *game) isWinByColumn(player string) bool {
	for i := 0; i < 3; i++ {
		if g.grid[0][i] == player && g.grid[1][i] == player && g.grid[2][i] == player {
			return true
		}
	}
	return false
}

func (g *game) isWinByDiagonal(player string) bool {
	return (g.grid[0][0] == player && g.grid[1][1] == player && g.grid[2][2] == player) ||
		(g.grid[0][2] == player && g.grid[1][1] == player && g.grid[2][0] == player)
}

func (g *game) isDraw() bool {
	return g.isOver() && !g.isWin("X") && !g.isWin("O")
}

func (g *game) isOver() bool {
	return g.countX+g.countO == 9
}

func (g *game) isInvalidBoard() error {
	if g.countX > g.countO+1 || g.countO > g.countX {
		return errors.New("invalid board")
	}
	if g.isWin("X") && g.isWin("O") {
		return errors.New("invalid board")
	}
	return nil
}