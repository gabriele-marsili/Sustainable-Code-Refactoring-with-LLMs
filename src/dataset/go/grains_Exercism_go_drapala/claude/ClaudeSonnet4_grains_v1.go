package grains

import "errors"

func Square(n int) (uint64, error) {
	if n < 1 || n > 64 {
		return 0, errors.New("n is not valid")
	}
	return 1 << (n - 1), nil
}

func Total() uint64 {
	return (1 << 64) - 1
}