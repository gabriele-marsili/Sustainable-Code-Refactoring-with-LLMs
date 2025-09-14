package sieve

func Sieve(limit int) (primes []int) {
	if limit < 2 {
		return []int{}
	}
	
	isPrime := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		isPrime[i] = true
	}
	
	for i := 2; i*i <= limit; i++ {
		if isPrime[i] {
			for j := i * i; j <= limit; j += i {
				isPrime[j] = false
			}
		}
	}
	
	primes = make([]int, 0, limit/10)
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
	
	filtered = make([]int, 0, len(slice))
	for _, v := range slice {
		if v%prime != 0 {
			filtered = append(filtered, v)
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
	size := upper - lower + 1
	if size <= 0 {
		return []int{}
	}
	result = make([]int, size)
	for i := 0; i < size; i++ {
		result[i] = lower + i
	}
	return result
}