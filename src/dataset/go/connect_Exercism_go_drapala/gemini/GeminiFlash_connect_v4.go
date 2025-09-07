package connect

import (
	"errors"
)

func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", errors.New("empty input")
	}

	rows := len(lines)
	cols := len(lines[0])

	if rows == 0 || cols == 0 {
		return "", errors.New("empty board")
	}

	board := make([][]rune, rows)
	for i := range lines {
		board[i] = []rune(lines[i])
		if len(board[i]) != cols {
			return "", errors.New("irregular board")
		}
	}

	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}

	var dfs func(row, col int, player rune) bool

	dfs = func(row, col int, player rune) bool {
		if row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col] || board[row][col] != player {
			return false
		}

		visited[row][col] = true

		if player == 'X' && col == cols-1 {
			return true
		}
		if player == 'O' && row == rows-1 {
			return true
		}

		directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {-1, -1}}

		for _, dir := range directions {
			newRow, newCol := row+dir[0], col+dir[1]
			if dfs(newRow, newCol, player) {
				return true
			}
		}

		return false
	}

	for i := 0; i < cols; i++ {
		if board[0][i] == 'X' {
			for r := range visited {
				for c := range visited[r] {
					visited[r][c] = false
				}
			}
			if dfs(0, i, 'X') {
				return "X", nil
			}
		}
	}

	for i := 0; i < rows; i++ {
		if board[i][0] == 'O' {
			for r := range visited {
				for c := range visited[r] {
					visited[r][c] = false
				}
			}
			if dfs(i, 0, 'O') {
				return "O", nil
			}
		}
	}

	return "", nil
}