package sieve

func Sieve(limit int) (primes []int) {
	if limit < 2 {
		return []int{}
	}

	isPrime := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		isPrime[i] = true
	}

	for p := 2; p*p <= limit; p++ {
		if isPrime[p] {
			for i := p * p; i <= limit; i += p {
				isPrime[i] = false
			}
		}
	}

	for p := 2; p <= limit; p++ {
		if isPrime[p] {
			primes = append(primes, p)
		}
	}

	return primes
}

func removeMultiples(slice []int, prime int) (filtered []int) {
	filtered = make([]int, 0, len(slice))
	for _, num := range slice {
		if num%prime != 0 {
			filtered = append(filtered, num)
		}
	}
	return filtered
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
	result = make([]int, 0, upper-lower+1)
	for i := lower; i <= upper; i++ {
		result = append(result, i)
	}
	return result
}