package grains

import "errors"

func Square(number int) (uint64, error) {
	if number < 1 || number > 64 {
		return 0, errors.New("number must be in the range of 1 to 64")
	}
	return 1 << (number - 1), nil
}

func Total() uint64 {
	return ^uint64(0)
}