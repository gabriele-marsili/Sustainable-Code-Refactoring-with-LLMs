package collatzconjecture

import "errors"

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return -1, errors.New("n must be a positive integer")
	}

	steps := 0
	for n != 1 {
		if n&1 == 0 { // Use bitwise operation for even check
			n >>= 1 // Use bitwise shift for division by 2
		} else {
			n = n*3 + 1
		}
		steps++
	}

	return steps, nil
}