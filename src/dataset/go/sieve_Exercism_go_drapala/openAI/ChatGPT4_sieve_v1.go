package sieve

func generateNums(limit int) []bool {
	// Use a boolean slice to track composite numbers
	numArray := make([]bool, limit+1)
	return numArray
}

func filterprimes(numArray []bool) []int {
	primes := make([]int, 0)
	for i := 2; i < len(numArray); i++ {
		if !numArray[i] {
			primes = append(primes, i)
		}
	}
	return primes
}

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	numArray := generateNums(limit)

	for i := 2; i*i <= limit; i++ {
		if !numArray[i] {
			for j := i * i; j <= limit; j += i {
				numArray[j] = true
			}
		}
	}

	return filterprimes(numArray)
}