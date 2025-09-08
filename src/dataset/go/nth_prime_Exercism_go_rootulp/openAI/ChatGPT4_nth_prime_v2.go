package prime

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	return findNthPrime(n), true
}

func findNthPrime(n int) int {
	primes := []int{}
	candidate := 2
	for len(primes) < n {
		if isPrime(candidate, primes) {
			primes = append(primes, candidate)
		}
		candidate++
	}
	return primes[n-1]
}

func isPrime(x int, primes []int) bool {
	for _, p := range primes {
		if p*p > x {
			break
		}
		if x%p == 0 {
			return false
		}
	}
	return true
}