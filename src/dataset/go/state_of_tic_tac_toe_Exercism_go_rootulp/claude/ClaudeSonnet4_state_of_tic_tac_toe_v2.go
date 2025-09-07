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
	// Convert board to byte array for faster access
	grid := [9]byte{}
	for i, row := range board {
		for j, char := range row {
			grid[i*3+j] = byte(char)
		}
	}
	
	// Count moves and validate in single pass
	xCount, oCount := 0, 0
	for _, cell := range grid {
		if cell == 'X' {
			xCount++
		} else if cell == 'O' {
			oCount++
		}
	}
	
	// Validate board
	if xCount > oCount+1 || oCount > xCount {
		return "", errors.New("invalid board")
	}
	
	// Check wins
	xWin := isWin(grid, 'X')
	oWin := isWin(grid, 'O')
	
	if xWin && oWin {
		return "", errors.New("invalid board")
	}
	
	if xWin || oWin {
		return Win, nil
	}
	
	if xCount+oCount == 9 {
		return Draw, nil
	}
	
	return Ongoing, nil
}

func isWin(grid [9]byte, player byte) bool {
	// Check rows
	for i := 0; i < 9; i += 3 {
		if grid[i] == player && grid[i+1] == player && grid[i+2] == player {
			return true
		}
	}
	
	// Check columns
	for i := 0; i < 3; i++ {
		if grid[i] == player && grid[i+3] == player && grid[i+6] == player {
			return true
		}
	}
	
	// Check diagonals
	if grid[0] == player && grid[4] == player && grid[8] == player {
		return true
	}
	if grid[2] == player && grid[4] == player && grid[6] == player {
		return true
	}
	
	return false
}