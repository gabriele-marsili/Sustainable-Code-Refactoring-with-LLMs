package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	isComposite := make([]bool, limit+1)
	primes := []int{}

	for i := 2; i <= limit; i++ {
		if !isComposite[i] {
			primes = append(primes, i)
			for j := i * i; j <= limit; j += i {
				isComposite[j] = true
			}
		}
	}

	return primes
}