package queenattack

import (
	"errors"
)

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
	row := position[1]
	
	if file < 'a' || file > 'h' || row < '1' || row > '8' {
		return coordinate{}, errors.New("invalid position")
	}
	
	return coordinate{
		row:    int(row - '0'),
		column: int(file - 'a' + 1),
	}, nil
}

func isValidRow(row int) bool {
	return row >= 1 && row <= 8
}

func isValidFile(file string) bool {
	return file >= "a" && file <= "h"
}

type coordinate struct {
	row    int
	column int
}

func (c coordinate) canAttack(other coordinate) bool {
	rowDiff := c.row - other.row
	colDiff := c.column - other.column
	
	if rowDiff < 0 {
		rowDiff = -rowDiff
	}
	if colDiff < 0 {
		colDiff = -colDiff
	}
	
	return rowDiff == 0 || colDiff == 0 || rowDiff == colDiff
}

func (c coordinate) isSameRow(other coordinate) bool {
	return c.row == other.row
}

func (c coordinate) isSameColumn(other coordinate) bool {
	return c.column == other.column
}

func (c coordinate) isDiagonal(other coordinate) bool {
	return abs(c.row-other.row) == abs(c.column-other.column)
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}