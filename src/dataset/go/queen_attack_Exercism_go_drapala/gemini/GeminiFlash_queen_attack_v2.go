package queenattack

import (
	"errors"
)

func pos2array(pos string) (int, int, error) {
	if len(pos) != 2 {
		return 0, 0, errors.New("invalid length of position")
	}

	col := int(pos[0] - 'a')
	row := int('8' - pos[1])

	if col < 0 || col > 7 {
		return 0, 0, errors.New("invalid first character of position")
	}
	if row < 0 || row > 7 {
		return 0, 0, errors.New("invalid second character of position")
	}

	return col, row, nil
}

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
	w_c, w_r, w_err := pos2array(whitePosition)
	b_c, b_r, b_err := pos2array(blackPosition)

	if w_err != nil {
		return false, w_err
	}
	if b_err != nil {
		return false, b_err
	}
	if whitePosition == blackPosition {
		return false, errors.New("same position")
	}

	if w_c == b_c || w_r == b_r || absInt(w_c-b_c) == absInt(w_r-b_r) {
		return true, nil
	}

	return false, nil
}

func absInt(n int) int {
	if n < 0 {
		return -n
	}
	return n
}