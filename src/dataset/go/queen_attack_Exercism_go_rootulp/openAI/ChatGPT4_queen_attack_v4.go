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
	return white.row == black.row || white.column == black.column || abs(white.row-black.row) == abs(white.column-black.column), nil
}

func parse(position string) (coordinate, error) {
	if len(position) != 2 || position[0] < 'a' || position[0] > 'h' || position[1] < '1' || position[1] > '8' {
		return coordinate{}, errors.New("invalid position")
	}
	return coordinate{row: int(position[1] - '0'), column: int(position[0] - 'a' + 1)}, nil
}

type coordinate struct {
	row    int
	column int
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}