package sieve

func Sieve(limit int) (primes []int) {
	if limit < 2 {
		return []int{}
	}
	isComposite := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		if !isComposite[i] {
			primes = append(primes, i)
			for multiple := i * i; multiple <= limit; multiple += i {
				isComposite[multiple] = true
			}
		}
	}
	return primes
}

func removeMultiples(slice []int, prime int) (filtered []int) {
	// Function no longer used in the optimized implementation
	return slice
}

func remove(slice []int, value int) (result []int) {
	// Function no longer used in the optimized implementation
	return slice
}

func createRange(lower int, upper int) (result []int) {
	// Function no longer used in the optimized implementation
	return result
}