package grains

import (
	"errors"
)

func Square(number int) (uint64, error) {
	if number <= 0 || number > 64 {
		return 0, errors.New("Number must be in a range of 1 to 64.")
	}

	return 1 << (number - 1), nil
}

func Total() uint64 {
	return 18446744073709551615
}