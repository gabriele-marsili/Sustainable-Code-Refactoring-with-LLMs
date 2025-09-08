package prime

import "math"

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	primes := getPrimesUpTo(n)
	return primes[n-1], true
}

func getPrimesUpTo(n int) (primes []int) {
	if n == 0 {
		return primes
	}
	
	primes = make([]int, 0, n)
	primes = append(primes, 2)
	
	if n == 1 {
		return primes
	}
	
	candidate := 3
	for len(primes) != n {
		if isPrime(candidate) {
			primes = append(primes, candidate)
		}
		candidate += 2
	}
	return primes
}

func isPrime(x int) bool {
	if x < 2 {
		return false
	}
	if x == 2 {
		return true
	}
	if x%2 == 0 {
		return false
	}
	
	limit := int(math.Sqrt(float64(x)))
	for i := 3; i <= limit; i += 2 {
		if x%i == 0 {
			return false
		}
	}
	return true
}