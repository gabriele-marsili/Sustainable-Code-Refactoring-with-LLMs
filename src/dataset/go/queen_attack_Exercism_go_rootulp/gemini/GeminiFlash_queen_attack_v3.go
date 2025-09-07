package queenattack

import (
	"errors"
)

var fileToColumn = map[byte]int{
	'a': 1,
	'b': 2,
	'c': 3,
	'd': 4,
	'e': 5,
	'f': 6,
	'g': 7,
	'h': 8,
}

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
	if len(whitePosition) != 2 || len(blackPosition) != 2 {
		return false, errors.New("invalid position")
	}

	whiteRow := int(whitePosition[1] - '0')
	blackRow := int(blackPosition[1] - '0')

	whiteCol, okWhite := fileToColumn[whitePosition[0]]
	if !okWhite || whiteRow < 1 || whiteRow > 8 {
		return false, errors.New("invalid position")
	}

	blackCol, okBlack := fileToColumn[blackPosition[0]]
	if !okBlack || blackRow < 1 || blackRow > 8 {
		return false, errors.New("invalid position")
	}

	if whiteRow == blackRow && whiteCol == blackCol {
		return false, errors.New("same square")
	}

	return canAttack(whiteRow, whiteCol, blackRow, blackCol), nil
}

func canAttack(whiteRow, whiteCol, blackRow, blackCol int) bool {
	return whiteRow == blackRow || whiteCol == blackCol || abs(whiteRow-blackRow) == abs(whiteCol-blackCol)
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}