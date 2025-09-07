package connect

import (
	"fmt"
)

// ResultOf determines the winner of a Connect Four game represented by a board of strings.
func ResultOf(lines []string) (string, error) {
	if len(lines) == 0 {
		return "", fmt.Errorf("empty board")
	}

	width := len(lines[0])
	height := len(lines)

	// Check rows
	for _, row := range lines {
		for i := 0; i <= width-4; i++ {
			if row[i:i+4] == "XXXX" {
				return "X", nil
			}
			if row[i:i+4] == "OOOO" {
				return "O", nil
			}
		}
	}

	// Check columns
	for col := 0; col < width; col++ {
		for row := 0; row <= height-4; row++ {
			if lines[row][col] == 'X' &&
				row+3 < height &&
				lines[row+1][col] == 'X' &&
				lines[row+2][col] == 'X' &&
				lines[row+3][col] == 'X' {
				return "X", nil
			}
			if lines[row][col] == 'O' &&
				row+3 < height &&
				lines[row+1][col] == 'O' &&
				lines[row+2][col] == 'O' &&
				lines[row+3][col] == 'O' {
				return "O", nil
			}
		}
	}

	// Check diagonals (top-left to bottom-right)
	for row := 0; row <= height-4; row++ {
		for col := 0; col <= width-4; col++ {
			if lines[row][col] == 'X' &&
				lines[row+1][col+1] == 'X' &&
				lines[row+2][col+2] == 'X' &&
				lines[row+3][col+3] == 'X' {
				return "X", nil
			}
			if lines[row][col] == 'O' &&
				lines[row+1][col+1] == 'O' &&
				lines[row+2][col+2] == 'O' &&
				lines[row+3][col+3] == 'O' {
				return "O", nil
			}
		}
	}

	// Check diagonals (top-right to bottom-left)
	for row := 0; row <= height-4; row++ {
		for col := 3; col < width; col++ {
			if lines[row][col] == 'X' &&
				lines[row+1][col-1] == 'X' &&
				lines[row+2][col-2] == 'X' &&
				lines[row+3][col-3] == 'X' {
				return "X", nil
			}
			if lines[row][col] == 'O' &&
				lines[row+1][col-1] == 'O' &&
				lines[row+2][col-2] == 'O' &&
				lines[row+3][col-3] == 'O' {
				return "O", nil
			}
		}
	}

	return "", nil
}