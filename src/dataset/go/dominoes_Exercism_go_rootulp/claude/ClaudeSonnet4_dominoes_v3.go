package dominoes

type Domino [2]int

func MakeChain(input []Domino) (chain []Domino, ok bool) {
	if len(input) == 0 {
		return input, true
	}
	
	used := make([]bool, len(input))
	chain = make([]Domino, 0, len(input))
	
	return makeChainOptimized(input, used, chain, 0)
}

func makeChainOptimized(dominoes []Domino, used []bool, chain []Domino, depth int) ([]Domino, bool) {
	if depth == len(dominoes) {
		return chain, isValidEnds(chain)
	}
	
	expectedLeft := -1
	if depth > 0 {
		expectedLeft = chain[depth-1][1]
	}
	
	for i, domino := range dominoes {
		if used[i] {
			continue
		}
		
		if depth > 0 && domino[0] != expectedLeft && domino[1] != expectedLeft {
			continue
		}
		
		used[i] = true
		
		var candidate Domino
		if depth == 0 || domino[0] == expectedLeft {
			candidate = domino
		} else {
			candidate = Domino{domino[1], domino[0]}
		}
		
		if depth < len(chain) {
			chain[depth] = candidate
		} else {
			chain = append(chain, candidate)
		}
		
		if result, ok := makeChainOptimized(dominoes, used, chain, depth+1); ok {
			return result, true
		}
		
		used[i] = false
	}
	
	return nil, false
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
	result = make([]Domino, 0, len(arr)-1)
	result = append(result, arr[:index]...)
	return append(result, arr[index+1:]...)
}

func isValid(chain []Domino) bool {
	return isValidEnds(chain) && isValidConnections(chain)
}

func isValidEnds(chain []Domino) bool {
	if len(chain) <= 1 {
		return len(chain) == 0 || chain[0][0] == chain[0][1]
	}
	return chain[0][0] == chain[len(chain)-1][1]
}

func isValidConnections(chain []Domino) bool {
	if len(chain) <= 1 {
		return true
	}
	for i := 1; i < len(chain); i++ {
		if chain[i-1][1] != chain[i][0] {
			return false
		}
	}
	return true
}

func flip(d Domino) (flipped Domino) {
	return Domino{d[1], d[0]}
}