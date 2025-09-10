package minesweeper

import (
	"fmt"
)

// Returns a count of stars surrounding the given cell
func (b Board) GetSurroundStars(r, c int) int {
	count := 0
	// Define the boundaries of the board
	rows := len(b)
	cols := len(b[0])

	// Define the possible offsets for neighbors
	offsets := []struct{ dr, dc int }{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	// Iterate through the offsets and check neighbors
	for _, offset := range offsets {
		nr, nc := r+offset.dr, c+offset.dc
		if nr >= 0 && nr < rows && nc >= 0 && nc < cols && b[nr][nc] == '*' {
			count++
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
	err := b.CheckClean()
	if err != nil {
		return err
	}

	rows := len(b)
	cols := len(b[0])

	for r := 1; r < rows-1; r++ {
		for c := 1; c < cols-1; c++ {
			if b[r][c] != '*' {
				count := b.GetSurroundStars(r, c)
				if count != 0 {
					b[r][c] = byte(count + '0')
				}
			}
		}
	}
	return nil
}