package connect

import (
	"errors"
)

func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", errors.New("input lines cannot be empty")
	}

	board := parseBoard(lines)
	if hasWinner(board, 'X') {
		return "X", nil
	}
	if hasWinner(board, 'O') {
		return "O", nil
	}
	return "", nil
}

func parseBoard(lines []string) [][]rune {
	board := make([][]rune, len(lines))
	for i, line := range lines {
		board[i] = []rune(line)
	}
	return board
}

func hasWinner(board [][]rune, player rune) bool {
	visited := make(map[[2]int]bool)
	for i := range board {
		if player == 'X' && board[i][0] == player && dfs(board, visited, i, 0, player) {
			return true
		}
		if player == 'O' && board[0][i] == player && dfs(board, visited, 0, i, player) {
			return true
		}
	}
	return false
}

func dfs(board [][]rune, visited map[[2]int]bool, x, y int, player rune) bool {
	if player == 'X' && y == len(board[0])-1 {
		return true
	}
	if player == 'O' && x == len(board)-1 {
		return true
	}

	directions := [][2]int{{0, 1}, {1, 0}, {1, -1}, {0, -1}, {-1, 0}, {-1, 1}}
	visited[[2]int{x, y}] = true

	for _, d := range directions {
		nx, ny := x+d[0], y+d[1]
		if nx >= 0 && ny >= 0 && nx < len(board) && ny < len(board[0]) && !visited[[2]int{nx, ny}] && board[nx][ny] == player {
			if dfs(board, visited, nx, ny, player) {
				return true
			}
		}
	}

	return false
}