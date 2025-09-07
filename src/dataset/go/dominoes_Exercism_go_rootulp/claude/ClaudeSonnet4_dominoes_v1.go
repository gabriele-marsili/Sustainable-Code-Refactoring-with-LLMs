package dominoes

type Domino [2]int

func MakeChain(input []Domino) (chain []Domino, ok bool) {
	if len(input) == 0 {
		return input, true
	}
	
	// Pre-allocate result slice to avoid repeated allocations
	result := make([]Domino, len(input))
	used := make([]bool, len(input))
	
	if makeChainOptimized(input, result, used, 0) {
		return result, true
	}
	return nil, false
}

func makeChainOptimized(dominoes []Domino, result []Domino, used []bool, pos int) bool {
	if pos == len(dominoes) {
		// Check if chain forms a valid loop
		return len(dominoes) == 0 || result[0][0] == result[len(dominoes)-1][1]
	}
	
	for i, domino := range dominoes {
		if used[i] {
			continue
		}
		
		// Try domino in original orientation
		if pos == 0 || result[pos-1][1] == domino[0] {
			result[pos] = domino
			used[i] = true
			if makeChainOptimized(dominoes, result, used, pos+1) {
				return true
			}
			used[i] = false
		}
		
		// Try domino flipped (only if different from original)
		if domino[0] != domino[1] && (pos == 0 || result[pos-1][1] == domino[1]) {
			result[pos] = Domino{domino[1], domino[0]}
			used[i] = true
			if makeChainOptimized(dominoes, result, used, pos+1) {
				return true
			}
			used[i] = false
		}
	}
	
	return false
}

func makeChain(remaining []Domino, chain []Domino) (result []Domino, ok bool) {
	if len(remaining) == 0 {
		return chain, isValid(chain)
	}
	if len(chain) >= 2 && !isValidConnections(chain) {
		return chain, false
	}
	for i, v := range remaining {
		candidateRemaining := removeIndex(remaining, i)

		candidateChain1 := append([]Domino{}, chain...)
		candidateChain2 := append([]Domino{}, chain...)

		candidateChain1 = append(candidateChain1, v)
		candidateChain2 = append(candidateChain2, flip(v))

		if result, ok := makeChain(candidateRemaining, candidateChain1); ok {
			return result, ok
		}
		if result, ok := makeChain(candidateRemaining, candidateChain2); ok {
			return result, ok
		}
	}
	return nil, false
}

func removeIndex(arr []Domino, index int) (result []Domino) {
	result = make([]Domino, len(arr)-1)
	copy(result, arr[:index])
	copy(result[index:], arr[index+1:])
	return result
}

func isValid(chain []Domino) bool {
	return isValidEnds(chain) && isValidConnections(chain)
}

func isValidEnds(chain []Domino) bool {
	if len(chain) == 0 {
		return true
	} else if len(chain) == 1 {
		return chain[0][0] == chain[0][1]
	} else {
		return chain[0][0] == chain[len(chain)-1][1]
	}
}

func isValidConnections(chain []Domino) bool {
	if len(chain) <= 1 {
		return true
	}
	lastRightSide := chain[0][1]
	for i := 1; i < len(chain); i++ {
		if lastRightSide != chain[i][0] {
			return false
		}
		lastRightSide = chain[i][1]
	}
	return true
}

func flip(d Domino) (flipped Domino) {
	return Domino{d[1], d[0]}
}