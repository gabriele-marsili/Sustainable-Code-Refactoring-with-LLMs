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
	if len(board) != 3 {
		return "", errors.New("invalid board size")
	}
	game, err := NewGame(board)
	if err != nil {
		return "", err
	}
	return game.getState()
}

type game struct {
	grid [3][3]string
}

func NewGame(board []string) (*game, error) {
	g := &game{}
	for i := 0; i < 3; i++ {
		row := board[i]
		if len(row) != 3 {
			return nil, errors.New("invalid row size")
		}
		for j := 0; j < 3; j++ {
			g.grid[i][j] = string(row[j])
		}
	}
	return g, nil
}

func (g *game) getState() (State, error) {
	if err := g.isInvalidBoard(); err != nil {
		return "", err
	}
	if isWin := g.isWin("X") || g.isWin("O"); isWin {
		return Win, nil
	}
	if g.isOver() {
		return Draw, nil
	}
	return Ongoing, nil
}

func (g *game) isWin(player string) bool {
	// Check rows
	for i := 0; i < 3; i++ {
		if g.grid[i][0] == player && g.grid[i][1] == player && g.grid[i][2] == player {
			return true
		}
	}

	// Check columns
	for j := 0; j < 3; j++ {
		if g.grid[0][j] == player && g.grid[1][j] == player && g.grid[2][j] == player {
			return true
		}
	}

	// Check diagonals
	if g.grid[0][0] == player && g.grid[1][1] == player && g.grid[2][2] == player {
		return true
	}
	if g.grid[0][2] == player && g.grid[1][1] == player && g.grid[2][0] == player {
		return true
	}

	return false
}

func (g *game) isOver() bool {
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.grid[i][j] != "X" && g.grid[i][j] != "O" {
				return false
			}
		}
	}
	return true
}

func (g *game) isInvalidBoard() error {
	movesX := 0
	movesO := 0
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.grid[i][j] == "X" {
				movesX++
			} else if g.grid[i][j] == "O" {
				movesO++
			}
		}
	}

	if movesX > movesO+1 {
		return errors.New("invalid board")
	}
	if movesO > movesX {
		return errors.New("invalid board")
	}
	if g.isWin("X") && g.isWin("O") {
		return errors.New("invalid board")
	}
	return nil
}