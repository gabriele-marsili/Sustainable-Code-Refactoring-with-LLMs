package prime

import "math"

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	primes := getPrimesUpTo(n)
	return primes[n-1], true
}

func getPrimesUpTo(n int) []int {
	if n == 1 {
		return []int{2}
	}
	
	primes := make([]int, 0, n)
	primes = append(primes, 2)
	
	candidate := 3
	for len(primes) < n {
		if isPrime(candidate, primes) {
			primes = append(primes, candidate)
		}
		candidate += 2
	}
	return primes
}

func isPrime(x int, knownPrimes []int) bool {
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
	for _, prime := range knownPrimes {
		if prime > limit {
			break
		}
		if x%prime == 0 {
			return false
		}
	}
	return true
}