package grains

import "errors"

func Square(square int) (uint64, error) {
	if square < 1 || square > 64 {
		return 0, errors.New("Not a valid square")
	}
	return 1 << (square - 1), nil
}

func Total() uint64 {
	return (1 << 64) - 1
}