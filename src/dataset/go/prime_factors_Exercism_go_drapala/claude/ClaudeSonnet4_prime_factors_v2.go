package prime

func Factors(n int64) []int64 {
	if n <= 1 {
		return []int64{}
	}
	
	divisors := make([]int64, 0, 64) // Pre-allocate with reasonable capacity
	
	// Handle factor 2 separately to avoid even number checks
	for n%2 == 0 {
		divisors = append(divisors, 2)
		n /= 2
	}
	
	// Check odd factors starting from 3
	for testDivisor := int64(3); testDivisor*testDivisor <= n; testDivisor += 2 {
		for n%testDivisor == 0 {
			divisors = append(divisors, testDivisor)
			n /= testDivisor
		}
	}
	
	// If n is still greater than 1, it's a prime factor
	if n > 1 {
		divisors = append(divisors, n)
	}
	
	return divisors
}