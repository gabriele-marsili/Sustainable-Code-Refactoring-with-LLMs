package collatzconjecture

import "fmt"

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return 0, fmt.Errorf("%d is not a positive number", n)
	}

	count := 0
	for n != 1 {
		if n&1 == 0 { // Even: Bitwise AND is faster than modulo
			n >>= 1 // Bitwise right shift is faster than division by 2
		} else {
			n = 3*n + 1
		}
		count++
	}
	return count, nil
}