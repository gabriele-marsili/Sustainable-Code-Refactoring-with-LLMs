package queenattack

import (
	"errors"
	"strconv"
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
	file := position[0]
	row, err := strconv.Atoi(position[1:])
	if err != nil || row < 1 || row > 8 || file < 'a' || file > 'h' {
		return coordinate{}, errors.New("invalid position")
	}

	column, ok := fileToColumn[file]
	if !ok {
		return coordinate{}, errors.New("invalid position")
	}

	return coordinate{row: row, column: column}, nil
}

type coordinate struct {
	row    int
	column int
}

func (c coordinate) canAttack(other coordinate) bool {
	if c.row == other.row || c.column == other.column {
		return true
	}
	rowDiff := c.row - other.row
	if rowDiff < 0 {
		rowDiff = -rowDiff
	}
	colDiff := c.column - other.column
	if colDiff < 0 {
		colDiff = -colDiff
	}
	return rowDiff == colDiff
}