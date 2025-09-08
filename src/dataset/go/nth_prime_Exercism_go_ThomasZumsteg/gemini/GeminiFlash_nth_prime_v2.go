package prime

/*Nth calculates the nth prime number, only valid for positive non zero numbers*/
func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	if n <= 8 {
		primes := []int{0, 2, 3, 5, 7, 11, 13, 17}
		return primes[n], true
	}

	primes := []int{2, 3, 5, 7, 11, 13, 17}
	candidate := primes[len(primes)-1] + 2
	for len(primes) < n {
		isPrime := true
		for _, p := range primes {
			if p*p > candidate {
				break
			}
			if candidate%p == 0 {
				isPrime = false
				break
			}
		}
		if isPrime {
			primes = append(primes, candidate)
		}
		candidate += 2
	}
	return primes[len(primes)-1], true
}