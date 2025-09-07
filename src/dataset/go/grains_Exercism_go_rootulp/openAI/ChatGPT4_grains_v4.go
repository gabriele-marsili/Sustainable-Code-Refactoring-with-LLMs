package grains

import "errors"

// Square returns the number of grains on the provided square.
func Square(n int) (uint64, error) {
	if n < 1 || n > 64 {
		return 0, errors.New("square: n is not between 1 and 64 (inclusive)")
	}
	return 1 << (n - 1), nil
}

// Total returns the sum of all grains on the chess board.
func Total() uint64 {
	return (1 << 64) - 1
}