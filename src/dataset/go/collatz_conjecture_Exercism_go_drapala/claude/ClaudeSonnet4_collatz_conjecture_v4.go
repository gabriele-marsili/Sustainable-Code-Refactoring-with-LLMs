package collatzconjecture

import "fmt"

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return 0, fmt.Errorf("%d is not a positive number", n)
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