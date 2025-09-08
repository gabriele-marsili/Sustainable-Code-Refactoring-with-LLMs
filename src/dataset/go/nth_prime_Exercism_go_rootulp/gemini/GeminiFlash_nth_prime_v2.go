package prime

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	primes := getPrimes(n)
	return primes[n-1], true
}

func getPrimes(n int) []int {
	primes := make([]int, 0, n)
	if n >= 1 {
		primes = append(primes, 2)
	}
	candidate := 3
	for len(primes) < n {
		isPrime := true
		for i := 0; primes[i]*primes[i] <= candidate; i++ {
			if candidate%primes[i] == 0 {
				isPrime = false
				break
			}
		}
		if isPrime {
			primes = append(primes, candidate)
		}
		candidate += 2
	}
	return primes
}