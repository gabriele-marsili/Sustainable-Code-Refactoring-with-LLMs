package collatzconjecture

import "fmt"

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return 0, fmt.Errorf("%d is not a positive number", n)
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