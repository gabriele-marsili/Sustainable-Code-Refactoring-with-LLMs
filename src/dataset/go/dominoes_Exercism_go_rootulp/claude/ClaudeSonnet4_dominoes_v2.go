package dominoes

type Domino [2]int

func MakeChain(input []Domino) (chain []Domino, ok bool) {
	if len(input) == 0 {
		return input, true
	}
	
	used := make([]bool, len(input))
	chain = make([]Domino, 0, len(input))
	
	return makeChain(input, chain, used, 0)
}

func makeChain(dominoes []Domino, chain []Domino, used []bool, depth int) (result []Domino, ok bool) {
	if depth == len(dominoes) {
		return chain, isValidEnds(chain)
	}
	
	if depth >= 2 && !isValidConnection(chain[depth-2], chain[depth-1]) {
		return nil, false
	}
	
	for i := range dominoes {
		if used[i] {
			continue
		}
		
		used[i] = true
		
		// Try original orientation
		if depth == 0 || chain[depth-1][1] == dominoes[i][0] {
			chain = append(chain, dominoes[i])
			if result, ok := makeChain(dominoes, chain, used, depth+1); ok {
				return result, true
			}
			chain = chain[:len(chain)-1]
		}
		
		// Try flipped orientation
		flipped := Domino{dominoes[i][1], dominoes[i][0]}
		if depth == 0 || chain[depth-1][1] == flipped[0] {
			chain = append(chain, flipped)
			if result, ok := makeChain(dominoes, chain, used, depth+1); ok {
				return result, true
			}
			chain = chain[:len(chain)-1]
		}
		
		used[i] = false
	}
	
	return nil, false
}

func isValidEnds(chain []Domino) bool {
	if len(chain) <= 1 {
		return len(chain) == 0 || chain[0][0] == chain[0][1]
	}
	return chain[0][0] == chain[len(chain)-1][1]
}

func isValidConnection(d1, d2 Domino) bool {
	return d1[1] == d2[0]
}