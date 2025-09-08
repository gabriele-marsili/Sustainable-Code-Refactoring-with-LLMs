package prime

import "math"

func IsPrime(x int) bool {
	if x <= 1 {
		return false
	}
	if x <= 3 {
		return true
	}
	if x%2 == 0 || x%3 == 0 {
		return false
	}
	for i := 5; i <= int(math.Sqrt(float64(x))); i = i + 6 {
		if x%i == 0 || x%(i+2) == 0 {
			return false
		}
	}
	return true
}

func Nth(n int) (int, bool) {
	if n < 1 {
		return 0, false
	}

	if n == 1 {
		return 2, true
	}

	count := 1
	num := 3
	for {
		if IsPrime(num) {
			count++
		}
		if count == n {
			return num, true
		}
		num += 2
		if num > 1000000 {
			return 0, false
		}
	}
}