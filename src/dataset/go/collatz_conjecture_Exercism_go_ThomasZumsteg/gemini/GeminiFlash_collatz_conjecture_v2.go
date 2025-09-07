package collatzconjecture

import "fmt"

func CollatzConjecture(num int) (int, error) {
	if num <= 0 {
		return 0, fmt.Errorf("Integers must be greater than zero: %d", num)
	}

	steps := 0
	for num != 1 {
		if num&1 == 0 { // Use bitwise AND for even number check, faster than modulo
			num >>= 1 // Use right bit shift for division by 2, faster than division
		} else {
			num = num*3 + 1
		}
		steps++
	}
	return steps, nil
}