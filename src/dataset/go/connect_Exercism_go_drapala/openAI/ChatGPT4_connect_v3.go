package connect

import (
	"errors"
)

func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", errors.New("input lines cannot be empty")
	}

	rows := len(lines)
	cols := len(lines[0])
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}

	var dfs func(x, y int, target byte) bool
	dfs = func(x, y int, target byte) bool {
		if x < 0 || y < 0 || x >= rows || y >= cols || visited[x][y] || lines[x][y] != target {
			return false
		}
		if target == 'O' && x == rows-1 {
			return true
		}
		if target == 'X' && y == cols-1 {
			return true
		}

		visited[x][y] = true
		defer func() { visited[x][y] = false }()

		directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, 1}, {1, -1}}
		for _, d := range directions {
			if dfs(x+d[0], y+d[1], target) {
				return true
			}
		}
		return false
	}

	for i := 0; i < rows; i++ {
		if lines[i][0] == 'X' && dfs(i, 0, 'X') {
			return "X", nil
		}
	}
	for j := 0; j < cols; j++ {
		if lines[0][j] == 'O' && dfs(0, j, 'O') {
			return "O", nil
		}
	}

	return "", nil
}