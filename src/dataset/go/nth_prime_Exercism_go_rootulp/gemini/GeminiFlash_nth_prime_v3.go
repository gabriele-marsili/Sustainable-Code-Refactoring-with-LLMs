package prime

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	primes := getPrimes(n)
	return primes[n-1], true
}

func getPrimes(n int) []int {
	if n <= 0 {
		return []int{}
	}

	limit := 2
	for i := 1; ; i++ {
		limit = i * i
		if countPrimes(limit) >= n {
			break
		}
	}

	primes := make([]int, 0, n)
	sieve := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		if !sieve[i] {
			primes = append(primes, i)
			if len(primes) == n {
				return primes
			}
			for j := i * i; j <= limit; j += i {
				sieve[j] = true
			}
		}
	}
	return primes
}

func countPrimes(n int) int {
	if n < 2 {
		return 0
	}
	isPrime := make([]bool, n)
	for i := 2; i < n; i++ {
		isPrime[i] = true
	}

	count := 0
	for i := 2; i*i < n; i++ {
		if !isPrime[i] {
			continue
		}
		for j := i * i; j < n; j += i {
			isPrime[j] = false
		}
	}

	for i := 2; i < n; i++ {
		if isPrime[i] {
			count++
		}
	}
	return count
}