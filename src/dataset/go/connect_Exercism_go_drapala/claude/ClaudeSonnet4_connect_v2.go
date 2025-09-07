package connect

import "errors"

func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", errors.New("empty board")
	}
	
	rows := len(lines)
	cols := len(lines[0])
	
	// Check for invalid board dimensions
	if rows == 0 || cols == 0 {
		return "", errors.New("invalid board")
	}
	
	// Validate board format
	for i, line := range lines {
		if len(line) != cols {
			return "", errors.New("inconsistent row length")
		}
		for _, char := range line {
			if char != 'X' && char != 'O' && char != '.' {
				return "", errors.New("invalid character")
			}
		}
	}
	
	// Check X wins (connects top to bottom)
	if hasPath(lines, 'X', true) {
		return "X", nil
	}
	
	// Check O wins (connects left to right)
	if hasPath(lines, 'O', false) {
		return "O", nil
	}
	
	return "", nil
}

func hasPath(board []string, player rune, vertical bool) bool {
	rows := len(board)
	cols := len(board[0])
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}
	
	if vertical {
		// Check connections from top row to bottom row
		for col := 0; col < cols; col++ {
			if rune(board[0][col]) == player && !visited[0][col] {
				if dfs(board, visited, 0, col, player, rows-1, -1, vertical) {
					return true
				}
			}
		}
	} else {
		// Check connections from left column to right column
		for row := 0; row < rows; row++ {
			if rune(board[row][0]) == player && !visited[row][0] {
				if dfs(board, visited, row, 0, player, -1, cols-1, vertical) {
					return true
				}
			}
		}
	}
	
	return false
}

func dfs(board []string, visited [][]bool, row, col int, player rune, targetRow, targetCol int, vertical bool) bool {
	rows := len(board)
	cols := len(board[0])
	
	if row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col] || rune(board[row][col]) != player {
		return false
	}
	
	visited[row][col] = true
	
	// Check if we reached the target
	if vertical && row == targetRow {
		return true
	}
	if !vertical && col == targetCol {
		return true
	}
	
	// Explore neighbors (6 directions for hex grid)
	directions := [][2]int{{-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}}
	
	for _, dir := range directions {
		newRow, newCol := row+dir[0], col+dir[1]
		if dfs(board, visited, newRow, newCol, player, targetRow, targetCol, vertical) {
			return true
		}
	}
	
	return false
}