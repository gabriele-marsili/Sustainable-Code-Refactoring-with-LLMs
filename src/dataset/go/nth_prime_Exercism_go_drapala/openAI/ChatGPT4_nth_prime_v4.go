package prime

import "math"

func IsPrime(x int) bool {
	if x < 2 {
		return false
	}
	if x == 2 {
		return true
	}
	if x%2 == 0 {
		return false
	}
	sqrtX := int(math.Sqrt(float64(x)))
	for i := 3; i <= sqrtX; i += 2 {
		if x%i == 0 {
			return false
		}
	}
	return true
}

func Nth(n int) (int, bool) {
	if n < 1 {
		return 0, false
	}

	count := 0
	for x := 2; ; x++ {
		if IsPrime(x) {
			count++
			if count == n {
				return x, true
			}
		}
	}
}