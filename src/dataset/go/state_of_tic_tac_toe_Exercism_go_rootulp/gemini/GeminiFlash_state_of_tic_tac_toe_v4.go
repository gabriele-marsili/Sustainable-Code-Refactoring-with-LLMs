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
	if len(board) != 3 {
		return nil, errors.New("invalid board: must have 3 rows")
	}
	g := &game{}
	for i := 0; i < 3; i++ {
		row := board[i]
		if len(row) != 3 {
			return nil, errors.New("invalid board: rows must have 3 characters")
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
	if g.isWin("X") {
		return Win, nil
	}
	if g.isWin("O") {
		return Win, nil
	}
	if g.isDraw() {
		return Draw, nil
	}
	return Ongoing, nil
}

func (g *game) isWin(player string) bool {
	for i := 0; i < 3; i++ {
		if g.grid[i][0] == player && g.grid[i][1] == player && g.grid[i][2] == player {
			return true
		}
		if g.grid[0][i] == player && g.grid[1][i] == player && g.grid[2][i] == player {
			return true
		}
	}
	if g.grid[0][0] == player && g.grid[1][1] == player && g.grid[2][2] == player {
		return true
	}
	if g.grid[0][2] == player && g.grid[1][1] == player && g.grid[2][0] == player {
		return true
	}
	return false
}

func (g *game) isDraw() bool {
	return g.isOver() && !g.isWin("X") && !g.isWin("O")
}

func (g *game) isOver() bool {
	count := 0
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.grid[i][j] != "" {
				count++
			}
		}
	}
	return count == 9
}

func (g *game) isInvalidBoard() error {
	movesX := g.getCount("X")
	movesO := g.getCount("O")

	if movesX > movesO+1 || movesO > movesX {
		return errors.New("invalid board: X and O counts are invalid")
	}

	if g.isWin("X") && g.isWin("O") {
		return errors.New("invalid board: both X and O cannot win")
	}

	return nil
}

func (g *game) getCount(player string) int {
	count := 0
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.grid[i][j] == player {
				count++
			}
		}
	}
	return count
}