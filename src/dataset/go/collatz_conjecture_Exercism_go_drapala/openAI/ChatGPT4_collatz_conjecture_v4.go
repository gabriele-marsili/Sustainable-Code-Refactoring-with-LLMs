package collatzconjecture

import "errors"

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return 0, errors.New("input must be a positive number")
	}

	count := 0
	for n > 1 {
		count++
		if n&1 == 0 { // Check if even using bitwise AND
			n >>= 1 // Divide by 2 using bitwise shift
		} else {
			n = 3*n + 1
		}
	}
	return count, nil
}