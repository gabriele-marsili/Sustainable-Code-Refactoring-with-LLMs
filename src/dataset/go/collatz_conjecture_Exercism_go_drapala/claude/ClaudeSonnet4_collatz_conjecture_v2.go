package collatzconjecture

import "errors"

var errNotPositive = errors.New("not a positive number")

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return 0, errNotPositive
	}

	count := 0
	for n != 1 {
		if n&1 == 0 {
			n >>= 1
		} else {
			n = 3*n + 1
		}
		count++
	}
	return count, nil
}