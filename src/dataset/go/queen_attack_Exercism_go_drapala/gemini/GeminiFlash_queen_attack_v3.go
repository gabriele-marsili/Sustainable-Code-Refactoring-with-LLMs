package queenattack

import (
	"errors"
	"math"
)

var col_map = map[byte]int{
	'a': 0,
	'b': 1,
	'c': 2,
	'd': 3,
	'e': 4,
	'f': 5,
	'g': 6,
	'h': 7,
}

var row_map = map[byte]int{
	'8': 0,
	'7': 1,
	'6': 2,
	'5': 3,
	'4': 4,
	'3': 5,
	'2': 6,
	'1': 7,
}

func pos2array(pos string) (int, int, error) {
	if len(pos) != 2 {
		return 0, 0, errors.New("invalid length of position")
	}

	firstChar := pos[0]
	secondChar := pos[1]

	if firstChar < 'a' || firstChar > 'h' {
		return 0, 0, errors.New("invalid first character of position")
	}

	if secondChar < '1' || secondChar > '8' {
		return 0, 0, errors.New("invalid second character of position")
	}

	row := col_map[firstChar]
	col := row_map[secondChar]

	return row, col, nil
}

func CheckIfDiagonal(w_r, w_c, b_r, b_c int) bool {
	return math.Abs(float64(w_r-b_r)) == math.Abs(float64(w_c-b_c))
}

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
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

	if w_c == b_c || w_r == b_r {
		return true, nil
	}

	return CheckIfDiagonal(w_r, w_c, b_r, b_c), nil
}