package sieve

func Sieve(limit int) (primes []int) {
	if limit < 2 {
		return []int{}
	}
	
	// Use boolean array instead of slice operations
	isPrime := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		isPrime[i] = true
	}
	
	for i := 2; i*i <= limit; i++ {
		if isPrime[i] {
			// Mark multiples as composite, starting from i*i
			for j := i * i; j <= limit; j += i {
				isPrime[j] = false
			}
		}
	}
	
	// Collect primes
	for i := 2; i <= limit; i++ {
		if isPrime[i] {
			primes = append(primes, i)
		}
	}
	
	return primes
}