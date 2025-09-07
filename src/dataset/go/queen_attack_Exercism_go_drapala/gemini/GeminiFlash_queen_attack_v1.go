package queenattack

import (
	"errors"
	"math"
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

	return row, col, nil
}

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
	w_r, w_c, w_err := pos2array(whitePosition)
	if w_err != nil {
		return false, w_err
	}

	b_r, b_c, b_err := pos2array(blackPosition)
	if b_err != nil {
		return false, b_err
	}

	if whitePosition == blackPosition {
		return false, errors.New("same position")
	}

	if w_c == b_c || w_r == b_r || math.Abs(float64(w_r-b_r)) == math.Abs(float64(w_c-b_c)) {
		return true, nil
	}

	return false, nil
}