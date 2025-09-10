package minesweeper

import (
	"fmt"
)

// Returns a count of stars surrounding the given cell
func (b Board) GetSurroundStars(r, c int) int {
	var count int

	// Define the boundaries of the board
	rows := len(b)
	cols := len(b[0])

	// Check surrounding cells, ensuring we don't go out of bounds
	for i := -1; i <= 1; i++ {
		for j := -1; j <= 1; j++ {
			if i == 0 && j == 0 {
				continue // Skip the cell itself
			}

			row := r + i
			col := c + j

			// Check boundaries before accessing the board
			if row >= 0 && row < rows && col >= 0 && col < cols && b[row][col] == '*' {
				count++
			}
		}
	}

	return count
}

// Check if a board is clean or not
func (b Board) CheckClean() error {
	rows := len(b)
	if rows == 0 {
		return fmt.Errorf("board is empty")
	}

	cols := len(b[0])
	for r := 0; r < rows; r++ {
		if len(b[r]) != cols {
			return fmt.Errorf("row %d has %d columns, expected %d", r, len(b[r]), cols)
		}

		if b[r][0] != '|' && b[r][0] != '+' {
			return fmt.Errorf("left edge of board has %c, expected | or +", b[r][0])
		}
		if b[r][cols-1] != '|' && b[r][cols-1] != '+' {
			return fmt.Errorf("right edge of board has %c, expected | or +", b[r][cols-1])
		}

		for c := 0; c < cols; c++ {
			d := b[r][c]
			if d != '*' && d != '+' && d != '-' && d != '|' && d != ' ' {
				return fmt.Errorf("board has %c at row %d, col %d, expected *, |, +, -, or space", d, r, c)
			}
		}
	}
	return nil
}

func (b Board) Count() error {
	if err := b.CheckClean(); err != nil {
		return err
	}

	rows := len(b)
	cols := len(b[0])

	for r := 1; r < rows-1; r++ {
		for c := 1; c < cols-1; c++ {
			if b[r][c] != '*' {
				count := b.GetSurroundStars(r, c)
				if count > 0 {
					b[r][c] = byte(count + '0') // Convert int to ASCII character
				}
			}
		}
	}

	return nil
}