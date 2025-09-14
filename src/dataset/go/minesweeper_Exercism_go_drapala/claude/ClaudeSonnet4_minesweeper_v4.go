package minesweeper

import (
	"fmt"
)

// Returns a count of stars surrounding the given cell
func (b Board) GetSurroundStars(r, c int) int {
	count := 0
	for dr := -1; dr <= 1; dr++ {
		for dc := -1; dc <= 1; dc++ {
			if dr == 0 && dc == 0 {
				continue
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
	rows := len(b)
	if rows == 0 {
		return fmt.Errorf("empty board")
	}
	
	cols := len(b[0])
	
	for r := 0; r < rows; r++ {
		if len(b[r]) != cols {
			return fmt.Errorf("row %d has %d columns, expected %d", r, len(b[r]), cols)
		}
		
		row := b[r]
		if row[0] != '|' && row[0] != '+' {
			return fmt.Errorf("left edge of board has %c, expected | or +", row[0])
		}
		if row[cols-1] != '|' && row[cols-1] != '+' {
			return fmt.Errorf("right edge of board has %c, expected | or +", row[cols-1])
		}
		
		for c := 0; c < cols; c++ {
			d := row[c]
			if d != '*' && d != '+' && d != '-' && d != '|' && d != ' ' {
				return fmt.Errorf("board has %c at row %d, col %d, expected *, |, +, or -", d, r, c)
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
				if count := b.GetSurroundStars(r, c); count != 0 {
					b[r][c] = byte(count + '0')
				}
			}
		}
	}
	return nil
}