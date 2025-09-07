package connect

import (
	"fmt"
	"strings"
)

func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", fmt.Errorf("empty input")
	}

	board := make([][]rune, len(lines))
	for i, line := range lines {
		board[i] = []rune(line)
		if len(board[i]) != len(lines[0]) {
			return "", fmt.Errorf("invalid board")
		}
	}

	n := len(board)

	// Check for X wins horizontally
	for i := 0; i < n; i++ {
		if checkHorizontal(board, i, 'X') {
			return "X", nil
		}
	}

	// Check for O wins vertically
	for j := 0; j < n; j++ {
		if checkVertical(board, j, 'O') {
			return "O", nil
		}
	}

	// Check for X wins from left to right
	visitedX := make([][]bool, n)
	for i := range visitedX {
		visitedX[i] = make([]bool, n)
	}
	for i := 0; i < n; i++ {
		if board[i][0] == 'X' && !visitedX[i][0] {
			if dfs(board, i, 0, 'X', visitedX) && checkLeftToRight(board, n) {
				return "X", nil
			}
		}
	}

	// Check for O wins from top to bottom
	visitedO := make([][]bool, n)
	for i := range visitedO {
		visitedO[i] = make([]bool, n)
	}
	for j := 0; j < n; j++ {
		if board[0][j] == 'O' && !visitedO[0][j] {
			if dfs(board, 0, j, 'O', visitedO) && checkTopToBottom(board, n) {
				return "O", nil
			}
		}
	}

	return "", nil
}

func checkHorizontal(board [][]rune, row int, player rune) bool {
	for _, cell := range board[row] {
		if cell != player {
			return false
		}
	}
	return true
}

func checkVertical(board [][]rune, col int, player rune) bool {
	for i := 0; i < len(board); i++ {
		if board[i][col] != player {
			return false
		}
	}
	return true
}

func checkLeftToRight(board [][]rune, n int) bool {
	for i := 0; i < n; i++ {
		if board[i][n-1] == 'X' {
			return true
		}
	}
	return false
}

func checkTopToBottom(board [][]rune, n int) bool {
	for j := 0; j < n; j++ {
		if board[n-1][j] == 'O' {
			return true
		}
	}
	return false
}

func dfs(board [][]rune, i, j int, player rune, visited [][]bool) bool {
	n := len(board)
	if i < 0 || i >= n || j < 0 || j >= n || board[i][j] != player || visited[i][j] {
		return false
	}

	visited[i][j] = true

	dfs(board, i+1, j, player, visited)
	dfs(board, i-1, j, player, visited)
	dfs(board, i, j+1, player, visited)
	dfs(board, i, j-1, player, visited)

	return true
}