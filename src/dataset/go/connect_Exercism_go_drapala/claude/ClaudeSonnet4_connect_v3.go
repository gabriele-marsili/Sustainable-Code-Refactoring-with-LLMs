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
	for i, line := range lines {
		trimmed := strings.TrimSpace(line)
		if len(trimmed) != cols {
			return "", errors.New("invalid board")
		}
		board[i] = []byte(trimmed)
	}
	
	if hasPath(board, 'O', true) {
		return "O", nil
	}
	if hasPath(board, 'X', false) {
		return "X", nil
	}
	
	return "", nil
}

func hasPath(board [][]byte, player byte, horizontal bool) bool {
	rows, cols := len(board), len(board[0])
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}
	
	if horizontal {
		for r := 0; r < rows; r++ {
			if board[r][0] == player && !visited[r][0] {
				if dfs(board, visited, r, 0, player, horizontal, rows, cols) {
					return true
				}
			}
		}
	} else {
		for c := 0; c < cols; c++ {
			if board[0][c] == player && !visited[0][c] {
				if dfs(board, visited, 0, c, player, horizontal, rows, cols) {
					return true
				}
			}
		}
	}
	
	return false
}

func dfs(board [][]byte, visited [][]bool, r, c int, player byte, horizontal bool, rows, cols int) bool {
	if horizontal && c == cols-1 {
		return true
	}
	if !horizontal && r == rows-1 {
		return true
	}
	
	visited[r][c] = true
	
	directions := [6][2]int{{-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}}
	
	for _, dir := range directions {
		nr, nc := r+dir[0], c+dir[1]
		if nr >= 0 && nr < rows && nc >= 0 && nc < cols && 
		   !visited[nr][nc] && board[nr][nc] == player {
			if dfs(board, visited, nr, nc, player, horizontal, rows, cols) {
				return true
			}
		}
	}
	
	return false
}