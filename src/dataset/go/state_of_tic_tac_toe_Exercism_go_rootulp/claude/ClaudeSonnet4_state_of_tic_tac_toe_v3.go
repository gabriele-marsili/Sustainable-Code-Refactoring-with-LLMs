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
		for j, char := range row {
			grid[i][j] = byte(char)
		}
	}
	return &game{grid: grid}
}

func (g game) getState() (State, error) {
	if err := g.isInvalidBoard(); err != nil {
		return "", err
	}
	
	xWins := g.isWin('X')
	oWins := g.isWin('O')
	
	if xWins || oWins {
		return Win, nil
	}
	
	if g.isDraw() {
		return Draw, nil
	}
	
	return Ongoing, nil
}

func (g game) isWin(player byte) bool {
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
	for i := 0; i < 3; i++ {
		if g.grid[0][i] == p && g.grid[1][i] == p && g.grid[2][i] == p {
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
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.grid[i][j] == ' ' {
				return false
			}
		}
	}
	return true
}

func (g game) isInvalidBoard() error {
	movesX := g.getCount("X")
	movesO := g.getCount("O")
	
	if movesX > movesO+1 || movesO > movesX {
		return errors.New("invalid board")
	}
	
	if g.isWin('X') && g.isWin('O') {
		return errors.New("invalid board")
	}
	
	return nil
}

func (g game) getCount(player string) int {
	p := byte(player[0])
	count := 0
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if g.grid[i][j] == p {
				count++
			}
		}
	}
	return count
}