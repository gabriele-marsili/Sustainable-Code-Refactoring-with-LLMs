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
	white, err := parse(whitePosition)
	if err != nil {
		return false, err
	}
	black, err := parse(blackPosition)
	if err != nil {
		return false, err
	}
	if white == black {
		return false, errors.New("same square")
	}
	return white.canAttack(black), nil
}

func parse(position string) (coordinate, error) {
	if len(position) != 2 {
		return coordinate{}, errors.New("invalid position")
	}

	file := position[0]
	row := int(position[1] - '0')
	if row < 1 || row > 8 || file < 'a' || file > 'h' {
		return coordinate{}, errors.New("invalid position")
	}
	column := fileToColumn[file]

	return coordinate{row: row, column: column}, nil
}

type coordinate struct {
	row    int
	column int
}

func (c coordinate) canAttack(other coordinate) bool {
	rowDiff := c.row - other.row
	colDiff := c.column - other.column
	return rowDiff == 0 || colDiff == 0 || abs(rowDiff) == abs(colDiff)
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}