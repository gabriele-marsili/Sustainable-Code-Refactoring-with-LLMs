package prime

/*Nth calculates the nth prime number, only valid for positive non zero numbers*/
func Nth(n int) (int, bool) {
	if n <= 0 {
		return 0, false
	}
	if n <= 8 {
		primes := []int{0, 2, 3, 5, 7, 11, 13, 17}
		return primes[n], true
	}

	primes := []int{2, 3, 5, 7, 11, 13, 17}
	size := 100
	candidates := make([]bool, size)
	for i := range candidates {
		candidates[i] = true
	}

	nextCandidate := primes[len(primes)-1] + 2
	index := (nextCandidate - 3) / 2

	for len(primes) < n {
		if index >= len(candidates) {
			newSize := size * 2
			newCandidates := make([]bool, newSize)
			copy(newCandidates, candidates)
			for i := size; i < newSize; i++ {
				newCandidates[i] = true
			}
			candidates = newCandidates
			size = newSize
		}

		if candidates[index] {
			primes = append(primes, nextCandidate)
			for i := nextCandidate * nextCandidate; i <= nextCandidate+2*len(candidates); i += 2 * nextCandidate {
				idx := (i - 3) / 2
				if idx < len(candidates) {
					candidates[idx] = false
				}
			}
		}
		nextCandidate += 2
		index++
	}

	return primes[n-1], true
}