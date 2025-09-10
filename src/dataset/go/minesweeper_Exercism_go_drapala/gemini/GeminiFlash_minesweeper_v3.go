package minesweeper

import (
	"fmt"
)

// Returns a count of stars surrounding the given cell
func (b Board) GetSurroundStars(r, c int) int {
	var count int
	rows := len(b)
	cols := len(b[0])

	for i := -1; i <= 1; i++ {
		for j := -1; j <= 1; j++ {
			if i == 0 && j == 0 {
				continue
			}
			row := r + i
			col := c + j

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
		return nil // Empty board is considered clean
	}
	cols := len(b[0])

	for r := 0; r < rows; r++ {
		if len(b[r]) != cols {
			return fmt.Errorf("row %d has %d columns, expected %d", r, len(b[r]), cols)
		}

		first := b[r][0]
		if first != '|' && first != '+' {
			return fmt.Errorf("left edge of board has %c, expected | or +", first)
		}

		last := b[r][cols-1]
		if last != '|' && last != '+' {
			return fmt.Errorf("right edge of board has %c, expected | or +", last)
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
	if rows <= 2 {
		return nil // Nothing to count if board is too small
	}
	cols := len(b[0])
	if cols <= 2 {
		return nil // Nothing to count if board is too small
	}

	for r := 1; r < rows-1; r++ {
		for c := 1; c < cols-1; c++ {
			if b[r][c] != '*' {
				starCount := b.GetSurroundStars(r, c)
				if starCount > 0 {
					b[r][c] = byte(starCount + '0')
				}
			}
		}
	}

	return nil
}