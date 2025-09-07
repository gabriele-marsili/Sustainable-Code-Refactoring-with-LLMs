package queenattack

import (
	"errors"
)

func pos2array(pos string) (int, int, error) {
	if len(pos) != 2 || pos[0] < 'a' || pos[0] > 'h' || pos[1] < '1' || pos[1] > '8' {
		return 0, 0, errors.New("invalid position")
	}
	return int(pos[0] - 'a'), int('8' - pos[1]), nil
}

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
	w_r, w_c, w_err := pos2array(whitePosition)
	b_r, b_c, b_err := pos2array(blackPosition)

	if w_err != nil {
		return false, w_err
	}
	if b_err != nil {
		return false, b_err
	}
	if whitePosition == blackPosition {
		return false, errors.New("same position")
	}

	return w_r == b_r || w_c == b_c || abs(w_r-b_r) == abs(w_c-b_c), nil
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}