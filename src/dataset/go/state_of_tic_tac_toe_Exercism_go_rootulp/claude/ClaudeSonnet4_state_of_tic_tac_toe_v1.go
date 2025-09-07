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
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			grid[i][j] = board[i][j]
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

func (g game) isWinByRow(player string) bool {
	p := byte(player[0])
	for i := 0; i < 3; i++ {
		if g.grid[i][0] == p && g.grid[i][1] == p && g.grid[i][2] == p {
			return true
		}
	}
	return false
}

func (g game) isWinByColumn(player string) bool {
	p := byte(player[0])
	for j := 0; j < 3; j++ {
		if g.grid[0][j] == p && g.grid[1][j] == p && g.grid[2][j] == p {
			return true
		}
	}
	return false
}

func (g game) isWinByDiagonal(player string) bool {
	p := byte(player[0])
	if g.grid[0][0] == p && g.grid[1][1] == p && g.grid[2][2] == p {
		return true
	}
	if g.grid[0][2] == p && g.grid[1][1] == p && g.grid[2][0] == p {
		return true
	}
	return false
}

func allCellsOccupied(player string, cells ...string) bool {
	for _, cell := range cells {
		if cell != player {
			return false
		}
	}
	return true
}

func (g game) isDraw() bool {
	return g.isOver() && !g.isWin('X') && !g.isWin('O')
}

func (g game) isOver() bool {
	return g.getCount('X')+g.getCount('O') == 9
}

func (g game) isInvalidBoard() error {
	movesX := g.getCount('X')
	movesO := g.getCount('O')
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