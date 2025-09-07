package grains

import (
	"errors"
)

var errInvalidSquare = errors.New("Number must be in a range of 1 to 64.")

func Square(number int) (uint64, error) {
	if uint(number-1) >= 64 {
		return 0, errInvalidSquare
	}

	return 1 << (number - 1), nil
}

func Total() uint64 {
	return ^uint64(0)
}