package sieve

func Sieve(limit int) (primes []int) {
	if limit < 2 {
		return []int{}
	}
	
	// Use boolean array for marking composites
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
	
	// Count primes first to allocate exact capacity
	count := 0
	for i := 2; i <= limit; i++ {
		if isPrime[i] {
			count++
		}
	}
	
	// Allocate with exact capacity
	primes = make([]int, 0, count)
	for i := 2; i <= limit; i++ {
		if isPrime[i] {
			primes = append(primes, i)
		}
	}
	
	return primes
}

func removeMultiples(slice []int, prime int) (filtered []int) {
	if len(slice) == 0 {
		return slice
	}
	multiplyer := 2
	multiple := multiplyer * prime
	for len(slice) != 0 && multiple <= slice[len(slice)-1] {
		slice = remove(slice, multiple)
		multiplyer += 1
		multiple = multiplyer * prime
	}
	return slice
}

func remove(slice []int, value int) (result []int) {
	result = make([]int, 0, len(slice))
	for _, v := range slice {
		if v != value {
			result = append(result, v)
		}
	}
	return result
}

func createRange(lower int, upper int) (result []int) {
	size := upper - lower + 1
	if size <= 0 {
		return []int{}
	}
	result = make([]int, 0, size)
	for i := lower; i <= upper; i++ {
		result = append(result, i)
	}
	return result
}