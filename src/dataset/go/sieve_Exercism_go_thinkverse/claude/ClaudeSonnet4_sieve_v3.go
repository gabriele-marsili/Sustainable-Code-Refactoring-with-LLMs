package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}

	primes := make([]int, 0, limit/int(2.5*float64(limit)/log(float64(limit))))

	composite := make([]bool, limit+1)

	primes = append(primes, 2)
	for j := 4; j <= limit; j += 2 {
		composite[j] = true
	}

	for i := 3; i*i <= limit; i += 2 {
		if !composite[i] {
			for j := i * i; j <= limit; j += 2 * i {
				composite[j] = true
			}
		}
	}

	for i := 3; i <= limit; i += 2 {
		if !composite[i] {
			primes = append(primes, i)
		}
	}

	return primes
}

func log(x float64) float64 {
	if x <= 0 {
		return 1
	}
	result := 0.0
	for x > 1 {
		x /= 2.718281828459045
		result++
	}
	if result == 0 {
		return 1
	}
	return result
}