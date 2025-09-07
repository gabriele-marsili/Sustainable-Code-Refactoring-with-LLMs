package queenattack

import (
	"errors"
	"strconv"
)

func CanQueenAttack(whitePosition, blackPosition string) (bool, error) {
	if len(whitePosition) != 2 || len(blackPosition) != 2 {
		return false, errors.New("invalid position")
	}

	whiteCol := whitePosition[0]
	whiteRow := whitePosition[1]
	blackCol := blackPosition[0]
	blackRow := blackPosition[1]

	if !isValidFile(whiteCol) || !isValidFile(blackCol) {
		return false, errors.New("invalid position")
	}

	whiteRowInt, err := strconv.Atoi(string(whiteRow))
	if err != nil || !isValidRow(whiteRowInt) {
		return false, errors.New("invalid position")
	}

	blackRowInt, err := strconv.Atoi(string(blackRow))
	if err != nil || !isValidRow(blackRowInt) {
		return false, errors.New("invalid position")
	}

	if whitePosition == blackPosition {
		return false, errors.New("same square")
	}

	return canAttack(whiteCol, whiteRowInt, blackCol, blackRowInt), nil
}

func isValidRow(row int) bool {
	return row >= 1 && row <= 8
}

func isValidFile(file byte) bool {
	return file >= 'a' && file <= 'h'
}

func canAttack(whiteCol byte, whiteRow int, blackCol byte, blackRow int) bool {
	return whiteRow == blackRow || whiteCol == blackCol || abs(int(whiteCol)-int(blackCol)) == abs(whiteRow-blackRow)
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}