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
	return getState(board)
}

func getState(board []string) (State, error) {
	if err := isInvalidBoard(board); err != nil {
		return "", err
	}
	if isWin := isWin(board, "X") || isWin(board, "O"); isWin {
		return Win, nil
	}
	if isDraw := isDraw(board); isDraw {
		return Draw, nil
	}
	return Ongoing, nil
}

func isWin(board []string, player string) bool {
	return isWinByRow(board, player) || isWinByColumn(board, player) || isWinByDiagonal(board, player)
}

func isWinByRow(board []string, player string) bool {
	for _, row := range board {
		if row[0:1] == player && row[1:2] == player && row[2:3] == player {
			return true
		}
	}
	return false
}

func isWinByColumn(board []string, player string) bool {
	for i := 0; i < 3; i++ {
		if board[0][i:i+1] == player && board[1][i:i+1] == player && board[2][i:i+1] == player {
			return true
		}
	}
	return false
}

func isWinByDiagonal(board []string, player string) bool {
	if board[0][0:1] == player && board[1][1:2] == player && board[2][2:3] == player {
		return true
	}
	if board[0][2:3] == player && board[1][1:2] == player && board[2][0:1] == player {
		return true
	}
	return false
}

func isDraw(board []string) bool {
	isWin := isWin(board, "X") || isWin(board, "O")
	return isOver(board) && !isWin
}

func isOver(board []string) bool {
	count := 0
	for _, row := range board {
		for _, cell := range row {
			if cell != " " {
				count++
			}
		}
	}
	return count == 9
}

func isInvalidBoard(board []string) error {
	movesX := getCount(board, "X")
	movesO := getCount(board, "O")
	if movesX > movesO+1 {
		return errors.New("invalid board")
	}
	if movesO > movesX {
		return errors.New("invalid board")
	}
	if isWin(board, "X") && isWin(board, "O") {
		return errors.New("invalid board")
	}
	return nil
}

func getCount(board []string, player string) (count int) {
	for _, row := range board {
		for _, cell := range row {
			if cell == player {
				count++
			}
		}
	}
	return count
}