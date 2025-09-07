package queenattack

import "errors"

func pos2array(pos string) (int, int, error) {
	// Error handling
	if len(pos) != 2 {
		return 0, 0, errors.New("invalid length of position")
	}
	
	firstChar := pos[0]
	secondChar := pos[1]
	
	// Error handling with direct range checks
	if firstChar < 'a' || firstChar > 'h' {
		return 0, 0, errors.New("invalid first character of position")
	}
	if secondChar < '1' || secondChar > '8' {
		return 0, 0, errors.New("invalid second character of position")
	}
	
	// Direct arithmetic conversion instead of map lookups
	row := int(firstChar - 'a')
	col := int('8' - secondChar)
	
	return row, col, nil
}

func CheckIfDiagonal(w_r, w_c, b_r, b_c int) bool {
	// Use integer arithmetic instead of floating point
	dr := w_r - b_r
	dc := w_c - b_c
	if dr < 0 {
		dr = -dr
	}
	if dc < 0 {
		dc = -dc
	}
	return dr == dc
}

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
	// Early check for same position to avoid unnecessary parsing
	if whitePosition == blackPosition {
		return false, errors.New("same position")
	}
	
	w_r, w_c, w_err := pos2array(whitePosition)
	if w_err != nil {
		return false, w_err
	}
	
	b_r, b_c, b_err := pos2array(blackPosition)
	if b_err != nil {
		return false, b_err
	}
	
	// Same row or column check
	if w_c == b_c || w_r == b_r {
		return true, nil
	}
	
	// Check diagonal
	return CheckIfDiagonal(w_r, w_c, b_r, b_c), nil
}