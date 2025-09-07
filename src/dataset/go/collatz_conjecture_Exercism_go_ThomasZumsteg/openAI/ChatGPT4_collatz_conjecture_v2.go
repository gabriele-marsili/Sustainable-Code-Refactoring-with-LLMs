package collatzconjecture

import "errors"

func CollatzConjecture(num int) (steps int, err error) {
	if num <= 0 {
		return 0, errors.New("input must be a positive integer")
	}
	for steps = 0; num != 1; steps++ {
		if num&1 == 0 { // Use bitwise operation for even check
			num >>= 1 // Use bitwise shift for division by 2
		} else {
			num = num*3 + 1
		}
	}
	return steps, nil
}