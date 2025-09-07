package collatzconjecture

import "errors"

func CollatzConjecture(num int) (i int, err error) {
	if num <= 0 {
		return 0, errors.New("integers must be greater than zero")
	}
	for num != 1 {
		if num&1 == 0 { // Use bitwise operation for even check
			num >>= 1 // Use bitwise right shift for division by 2
		} else {
			num = num*3 + 1
		}
		i++
	}
	return i, nil
}