package connect

import (
	"errors"
	"strings"
)

func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", errors.New("empty board")
	}
	
	// Validate board dimensions and format
	height := len(lines)
	width := len(strings.TrimSpace(lines[0]))
	if width == 0 {
		return "", errors.New("invalid board")
	}
	
	// Parse board efficiently
	board := make([][]byte, height)
	for i, line := range lines {
		trimmed := strings.TrimSpace(line)
		if len(trimmed) != width {
			return "", errors.New("inconsistent board width")
		}
		board[i] = []byte(trimmed)
	}
	
	// Check for X win (left to right)
	if hasPath(board, 'X', height, width, true) {
		return "X", nil
	}
	
	// Check for O win (top to bottom)
	if hasPath(board, 'O', height, width, false) {
		return "O", nil
	}
	
	return "", nil
}

func hasPath(board [][]byte, player byte, height, width int, horizontal bool) bool {
	visited := make([][]bool, height)
	for i := range visited {
		visited[i] = make([]bool, width)
	}
	
	if horizontal {
		// X wins by connecting left to right
		for r := 0; r < height; r++ {
			if board[r][0] == player && !visited[r][0] {
				if dfs(board, visited, r, 0, player, height, width, horizontal) {
					return true
				}
			}
		}
	} else {
		// O wins by connecting top to bottom
		for c := 0; c < width; c++ {
			if board[0][c] == player && !visited[0][c] {
				if dfs(board, visited, 0, c, player, height, width, horizontal) {
					return true
				}
			}
		}
	}
	
	return false
}

func dfs(board [][]byte, visited [][]bool, r, c int, player byte, height, width int, horizontal bool) bool {
	if horizontal && c == width-1 {
		return true
	}
	if !horizontal && r == height-1 {
		return true
	}
	
	visited[r][c] = true
	
	// Check all 6 directions in hex grid
	directions := [][2]int{{-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}}
	
	for _, dir := range directions {
		nr, nc := r+dir[0], c+dir[1]
		if nr >= 0 && nr < height && nc >= 0 && nc < width && 
		   !visited[nr][nc] && board[nr][nc] == player {
			if dfs(board, visited, nr, nc, player, height, width, horizontal) {
				return true
			}
		}
	}
	
	return false
}