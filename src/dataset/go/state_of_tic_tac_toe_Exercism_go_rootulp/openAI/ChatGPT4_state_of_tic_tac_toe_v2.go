package stateoftictactoe

import (
	"errors"
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
	grid [3][3]byte
}

func NewGame(board []string) *game {
	var grid [3][3]byte
	for i, row := range board {
		for j := 0; j < 3; j++ {
			grid[i][j] = row[j]
		}
	}
	return &game{grid: grid}
}

func (g game) getState() (State, error) {
	if err := g.isInvalidBoard(); err != nil {
		return "", err
	}
	if g.isWin('X') || g.isWin('O') {
		return Win, nil
	}
	if g.isDraw() {
		return Draw, nil
	}
	return Ongoing, nil
}

func (g game) isWin(player byte) bool {
	for i := 0; i < 3; i++ {
		if (g.grid[i][0] == player && g.grid[i][1] == player && g.grid[i][2] == player) || // Row
			(g.grid[0][i] == player && g.grid[1][i] == player && g.grid[2][i] == player) { // Column
			return true
		}
	}
	// Diagonals
	return (g.grid[0][0] == player && g.grid[1][1] == player && g.grid[2][2] == player) ||
		(g.grid[0][2] == player && g.grid[1][1] == player && g.grid[2][0] == player)
}

func (g game) isDraw() bool {
	return g.isOver() && !(g.isWin('X') || g.isWin('O'))
}

func (g game) isOver() bool {
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.grid[i][j] != 'X' && g.grid[i][j] != 'O' {
				return false
			}
		}
	}
	return true
}

func (g game) isInvalidBoard() error {
	movesX, movesO := g.getCount('X'), g.getCount('O')
	if movesX > movesO+1 || movesO > movesX {
		return errors.New("invalid board")
	}
	if g.isWin('X') && g.isWin('O') {
		return errors.New("invalid board")
	}
	return nil
}

func (g game) getCount(player byte) (count int) {
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.grid[i][j] == player {
				count++
			}
		}
	}
	return count
}