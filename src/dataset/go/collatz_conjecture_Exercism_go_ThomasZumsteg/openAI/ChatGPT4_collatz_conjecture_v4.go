package collatzconjecture

import "errors"

func CollatzConjecture(num int) (int, error) {
	if num <= 0 {
		return 0, errors.New("input must be a positive integer")
	}
	steps := 0
	for num != 1 {
		if num&1 == 0 { // Check if even using bitwise AND
			num >>= 1 // Divide by 2 using bitwise shift
		} else {
			num = num*3 + 1
		}
		steps++
	}
	return steps, nil
}