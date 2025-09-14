package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}
	
	// Use boolean slice instead of struct slice
	isPrime := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		isPrime[i] = true
	}
	
	// Sieve of Eratosthenes
	for i := 2; i*i <= limit; i++ {
		if isPrime[i] {
			// Mark multiples as composite, starting from i*i
			for j := i * i; j <= limit; j += i {
				isPrime[j] = false
			}
		}
	}
	
	// Count primes first to allocate exact size
	count := 0
	for i := 2; i <= limit; i++ {
		if isPrime[i] {
			count++
		}
	}
	
	// Collect primes with pre-allocated slice
	primes := make([]int, 0, count)
	for i := 2; i <= limit; i++ {
		if isPrime[i] {
			primes = append(primes, i)
		}
	}
	
	return primes
}