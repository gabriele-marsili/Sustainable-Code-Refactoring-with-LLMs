package collatzconjecture

import "errors"

func CollatzConjecture(n int) (int, error) {
	if n < 1 {
		return 0, errors.New("n must be positive")
	}
	
	steps := 0
	for n != 1 {
		steps++
		if n&1 == 0 {
			n >>= 1
		} else {
			n = 3*n + 1
		}
	}
	return steps, nil
}