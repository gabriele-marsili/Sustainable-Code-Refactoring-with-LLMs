package prime

import "math"

func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}

	// Estimate the upper bound for the nth prime number.  This is a rough
	// approximation, but it avoids repeatedly reallocating the primes array.
	upperBound := 2 * n * int(math.Log(float64(n)))
	if upperBound < 13 {
		upperBound = 30 // handle small n cases
	}

	primes := getPrimesUpTo(upperBound, n)
	if len(primes) < n {
		// In rare cases, the estimate might be too low.  Recalculate with a larger bound.
		upperBound = int(1.5 * float64(upperBound))
		primes = getPrimesUpTo(upperBound, n)
		if len(primes) < n {
			// Last resort: increase by n
			upperBound += n
			primes = getPrimesUpTo(upperBound, n)
			if len(primes) < n {
				return 0, false // Should not happen, but handle the edge case
			}
		}
	}

	return primes[n-1], true
}

func getPrimesUpTo(upperBound int, n int) (primes []int) {
	if n > upperBound {
		return []int{}
	}

	isPrime := make([]bool, upperBound+1)
	for i := 2; i <= upperBound; i++ {
		isPrime[i] = true
	}

	for p := 2; p*p <= upperBound; p++ {
		if isPrime[p] {
			for i := p * p; i <= upperBound; i += p {
				isPrime[i] = false
			}
		}
	}

	for p := 2; p <= upperBound; p++ {
		if isPrime[p] {
			primes = append(primes, p)
			if len(primes) == n {
				return primes
			}
		}
	}
	return primes
}