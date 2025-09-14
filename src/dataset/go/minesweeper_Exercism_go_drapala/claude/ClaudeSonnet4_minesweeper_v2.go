package minesweeper

import (
	"fmt"
)

// Returns a count of stars surrounding the given cell
func (b Board) GetSurroundStars(r, c int) int {
	count := 0
	// Check all 8 surrounding cells in a single loop
	for dr := -1; dr <= 1; dr++ {
		for dc := -1; dc <= 1; dc++ {
			if dr == 0 && dc == 0 {
				continue // Skip the center cell
			}
			if b[r+dr][c+dc] == '*' {
				count++
			}
		}
	}
	return count
}

// Check if a board is clean or not
func (b Board) CheckClean() error {
	// Dimension check
	rows := len(b)
	if rows == 0 {
		return fmt.Errorf("empty board")
	}
	cols := len(b[0])
	
	// Loop over rows
	for r := 0; r < rows; r++ {
		row := b[r]
		// Check if same size as first row
		if len(row) != cols {
			return fmt.Errorf("row %d has %d columns, expected %d", r, len(row), cols)
		}
		// Edge '|' check
		if (row[0] != '|') && (row[0] != '+') { // Left side
			return fmt.Errorf("left edge of board has %c, expected | or +", row[0])
		}
		if (row[cols-1] != '|') && (row[cols-1] != '+') { // Right side
			return fmt.Errorf("right edge of board has %c, expected | or +", row[cols-1])
		}
		// Foreign character check
		for c := 0; c < cols; c++ {
			// Must be *, +, -, | or ' '
			d := row[c]
			if (d != '*') && (d != '+') && (d != '-') && (d != '|') && (d != ' ') {
				return fmt.Errorf("board has %c at row %d, col %d, expected *, |, +, or -", d, r, c)
			}
		}
	}
	// Return nil if all checks pass
	return nil
}

func (b Board) Count() error {
	// Error check
	err := b.CheckClean()
	if err != nil {
		return err
	}
	// Dimensions
	rows := len(b)    // Includes 2 extras
	cols := len(b[0]) // Includes 2 extras
	// Loop over rows
	for r := 1; r < rows-1; r++ {
		for c := 1; c < cols-1; c++ { // Loop over cols in the row
			if b[r][c] != '*' { // Don't overwrite stars
				count := b.GetSurroundStars(r, c)
				if count != 0 {
					b[r][c] = byte(count + '0') // Direct ASCII conversion
				}
			}
		}
	}
	return nil
}