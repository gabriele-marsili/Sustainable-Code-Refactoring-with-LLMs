package collatzconjecture

import "errors"

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return 0, errors.New("n must be a positive integer")
	}

	steps := 0
	for n != 1 {
		if n&1 == 0 {
			n >>= 1
		} else {
			n = n*3 + 1
		}
		steps++
	}

	return steps, nil
}