package connect

import (
	"errors"
)

func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", errors.New("empty input")
	}

	boardSize := len(lines)
	if boardSize == 0 || len(lines[0]) == 0 {
		return "", errors.New("invalid board size")
	}

	// Check for invalid board dimensions (non-square)
	for _, row := range lines {
		if len(row) != boardSize {
			return "", errors.New("non-square board")
		}
	}

	// Check for invalid characters
	for _, row := range lines {
		for _, char := range row {
			if char != 'X' && char != 'O' {
				return "", errors.New("invalid character in board")
			}
		}
	}

	visitedX := make([][]bool, boardSize)
	for i := range visitedX {
		visitedX[i] = make([]bool, boardSize)
	}

	visitedO := make([][]bool, boardSize)
	for i := range visitedO {
		visitedO[i] = make([]bool, boardSize)
	}

	var dfs func(row, col int, player rune, visited [][]bool) bool

	dfs = func(row, col int, player rune, visited [][]bool) bool {
		if row < 0 || row >= boardSize || col < 0 || col >= boardSize || visited[row][col] || rune(lines[row][col]) != player {
			return false
		}

		visited[row][col] = true

		if player == 'X' && col == boardSize-1 {
			return true
		}
		if player == 'O' && row == boardSize-1 {
			return true
		}

		// Explore adjacent cells
		return dfs(row+1, col, player, visited) ||
			dfs(row-1, col, player, visited) ||
			dfs(row, col+1, player, visited) ||
			dfs(row, col-1, player, visited)
	}

	// Check for X win
	for i := 0; i < boardSize; i++ {
		if lines[i][0] == 'X' && dfs(i, 0, 'X', visitedX) {
			return "X", nil
		}
	}

	// Check for O win
	for i := 0; i < boardSize; i++ {
		if lines[0][i] == 'O' && dfs(0, i, 'O', visitedO) {
			return "O", nil
		}
	}

	return "", nil
}