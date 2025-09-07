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

	if !isValidFile(whiteCol) || !isValidRow(whiteRow) || !isValidFile(blackCol) || !isValidRow(blackRow) {
		return false, errors.New("invalid position")
	}

	if whitePosition == blackPosition {
		return false, errors.New("same square")
	}

	whiteRowInt := int(whiteRow - '0')
	blackRowInt := int(blackRow - '0')
	whiteColInt := int(whiteCol - 'a' + 1)
	blackColInt := int(blackCol - 'a' + 1)

	return canAttack(whiteRowInt, whiteColInt, blackRowInt, blackColInt), nil
}

func isValidRow(row byte) bool {
	return row >= '1' && row <= '8'
}

func isValidFile(file byte) bool {
	return file >= 'a' && file <= 'h'
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