package sieve

func generateNums(limit int) []bool {
	numArray := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		numArray[i] = true
	}
	return numArray
}

func filterprimes(numArray []bool) []int {
	primes := make([]int, 0)
	for i, isPrime := range numArray {
		if isPrime {
			primes = append(primes, i)
		}
	}
	return primes
}

func Sieve(limit int) []int {
	numArray := generateNums(limit)

	for i := 2; i*i <= limit; i++ {
		if numArray[i] {
			for j := i * i; j <= limit; j += i {
				numArray[j] = false
			}
		}
	}

	return filterprimes(numArray)
}