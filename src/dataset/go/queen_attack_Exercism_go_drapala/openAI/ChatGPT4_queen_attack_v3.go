package queenattack

import (
	"errors"
)

var colMap = map[byte]int{
	'a': 0, 'b': 1, 'c': 2, 'd': 3,
	'e': 4, 'f': 5, 'g': 6, 'h': 7,
}

var rowMap = map[byte]int{
	'8': 0, '7': 1, '6': 2, '5': 3,
	'4': 4, '3': 5, '2': 6, '1': 7,
}

func pos2array(pos string) (int, int, error) {
	if len(pos) != 2 || pos[0] < 'a' || pos[0] > 'h' || pos[1] < '1' || pos[1] > '8' {
		return 0, 0, errors.New("invalid position")
	}
	return colMap[pos[0]], rowMap[pos[1]], nil
}

func CheckIfDiagonal(w_r, w_c, b_r, b_c int) bool {
	diffR := w_r - b_r
	diffC := w_c - b_c
	return diffR == diffC || diffR == -diffC
}

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
	if whitePosition == blackPosition {
		return false, errors.New("same position")
	}

	w_r, w_c, err := pos2array(whitePosition)
	if err != nil {
		return false, err
	}

	b_r, b_c, err := pos2array(blackPosition)
	if err != nil {
		return false, err
	}

	if w_r == b_r || w_c == b_c || CheckIfDiagonal(w_r, w_c, b_r, b_c) {
		return true, nil
	}
	return false, nil
}