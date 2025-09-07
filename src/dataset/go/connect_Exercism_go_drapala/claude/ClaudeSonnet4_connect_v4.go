package connect

import (
	"errors"
	"strings"
)

func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", errors.New("empty board")
	}
	
	rows := len(lines)
	if rows == 0 {
		return "", errors.New("empty board")
	}
	
	cols := len(strings.TrimSpace(lines[0]))
	if cols == 0 {
		return "", errors.New("empty board")
	}
	
	board := make([][]byte, rows)
	for i := range board {
		line := strings.TrimSpace(lines[i])
		if len(line) != cols {
			return "", errors.New("inconsistent board dimensions")
		}
		board[i] = make([]byte, cols)
		for j, char := range line {
			switch char {
			case 'O', 'X', ' ':
				board[i][j] = byte(char)
			default:
				return "", errors.New("invalid character on board")
			}
		}
	}
	
	if hasWon(board, 'O', rows, cols, true) {
		return "O", nil
	}
	if hasWon(board, 'X', rows, cols, false) {
		return "X", nil
	}
	
	return "", nil
}

func hasWon(board [][]byte, player byte, rows, cols int, horizontal bool) bool {
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}
	
	if horizontal {
		for r := 0; r < rows; r++ {
			if board[r][0] == player && !visited[r][0] {
				if dfs(board, visited, player, r, 0, rows, cols, horizontal) {
					return true
				}
			}
		}
	} else {
		for c := 0; c < cols; c++ {
			if board[0][c] == player && !visited[0][c] {
				if dfs(board, visited, player, 0, c, rows, cols, horizontal) {
					return true
				}
			}
		}
	}
	
	return false
}

func dfs(board [][]byte, visited [][]bool, player byte, r, c, rows, cols int, horizontal bool) bool {
	if r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || board[r][c] != player {
		return false
	}
	
	if horizontal && c == cols-1 {
		return true
	}
	if !horizontal && r == rows-1 {
		return true
	}
	
	visited[r][c] = true
	
	directions := [6][2]int{{-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}}
	
	for _, dir := range directions {
		if dfs(board, visited, player, r+dir[0], c+dir[1], rows, cols, horizontal) {
			return true
		}
	}
	
	return false
}