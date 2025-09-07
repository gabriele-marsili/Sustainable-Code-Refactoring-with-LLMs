package collatzconjecture

import "errors"

var errNonPositive = errors.New("only positive integers are allowed")

func CollatzConjecture(num int) (int, error) {
	if num <= 0 {
		return 0, errNonPositive
	}
	
	steps := 0
	for num != 1 {
		if num&1 == 0 {
			num >>= 1
		} else {
			num = num*3 + 1
		}
		steps++
	}
	return steps, nil
}