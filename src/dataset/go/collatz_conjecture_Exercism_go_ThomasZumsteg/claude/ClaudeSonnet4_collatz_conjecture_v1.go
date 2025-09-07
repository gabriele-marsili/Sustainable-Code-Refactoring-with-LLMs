package collatzconjecture

import "errors"

var errNonPositive = errors.New("only positive integers are allowed")

func CollatzConjecture(num int) (i int, err error) {
	if num <= 0 {
		return 0, errNonPositive
	}
	for num != 1 {
		if num&1 == 0 {
			num >>= 1
		} else {
			num = num*3 + 1
		}
		i++
	}
	return
}