package prime

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	
	if n <= 7 {
		primes := [8]int{0, 2, 3, 5, 7, 11, 13, 17}
		return primes[n], true
	}
	
	primes := make([]int, 8, n+1)
	copy(primes, []int{0, 2, 3, 5, 7, 11, 13, 17})
	
	candidate := 19
	for len(primes) <= n {
		isPrime := true
		limit := candidate
		for i := 1; primes[i]*primes[i] <= limit; i++ {
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
	
	return primes[n], true
}