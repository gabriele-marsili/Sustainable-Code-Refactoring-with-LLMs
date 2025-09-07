package collatzconjecture

import "fmt"

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return 0, fmt.Errorf("%d is not a positive number", n)
	}

	count := 0
	for n != 1 {
		if n%2 == 0 {
			n >>= 1 // Use bitwise shift for division by 2
		} else {
			n = (n << 1) + n + 1 // Use bitwise operations for 3*n + 1
		}
		count++
	}
	return count, nil
}