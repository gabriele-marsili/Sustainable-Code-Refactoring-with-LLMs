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

func CheckIfDiagonal(w_r, w_c, b_r, b_c int) bool {
	diff_r := w_r - b_r
	diff_c := w_c - b_c
	return diff_r == diff_c || diff_r == -diff_c
}

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
	w_r, w_c, err := pos2array(whitePosition)
	if err != nil {
		return false, err
	}
	b_r, b_c, err := pos2array(blackPosition)
	if err != nil {
		return false, err
	}
	if w_r == b_r && w_c == b_c {
		return false, errors.New("same position")
	}
	return w_r == b_r || w_c == b_c || CheckIfDiagonal(w_r, w_c, b_r, b_c), nil
}