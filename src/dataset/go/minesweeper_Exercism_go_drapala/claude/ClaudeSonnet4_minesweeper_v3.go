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
	rows := len(b)
	if rows == 0 {
		return fmt.Errorf("empty board")
	}
	
	cols := len(b[0])
	
	for r := 0; r < rows; r++ {
		rowLen := len(b[r])
		if rowLen != cols {
			return fmt.Errorf("row %d has %d columns, expected %d", r, rowLen, cols)
		}
		
		// Edge check
		leftChar := b[r][0]
		rightChar := b[r][cols-1]
		
		if leftChar != '|' && leftChar != '+' {
			return fmt.Errorf("left edge of board has %c, expected | or +", leftChar)
		}
		if rightChar != '|' && rightChar != '+' {
			return fmt.Errorf("right edge of board has %c, expected | or +", rightChar)
		}
		
		// Character validation
		for c := 0; c < cols; c++ {
			char := b[r][c]
			if char != '*' && char != '+' && char != '-' && char != '|' && char != ' ' {
				return fmt.Errorf("board has %c at row %d, col %d, expected *, |, +, or -", char, r, c)
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
					b[r][c] = byte(count + '0')
				}
			}
		}
	}
	
	return nil
}