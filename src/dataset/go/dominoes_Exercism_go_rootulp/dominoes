package dominoes

type Domino [2]int

func MakeChain(input []Domino) (chain []Domino, ok bool) {
	if len(input) == 0 {
		return input, true
	}
	return makeChain(input, nil)
}

func makeChain(remaining []Domino, chain []Domino) (result []Domino, ok bool) {
	if len(remaining) == 0 {
		if isValidEnds(chain) {
			return chain, true
		}
		return nil, false
	}
	for i, v := range remaining {
		candidateRemaining := append(remaining[:i], remaining[i+1:]...)

		if result, ok := makeChain(candidateRemaining, append(chain, v)); ok {
			return result, true
		}
		if result, ok := makeChain(candidateRemaining, append(chain, flip(v))); ok {
			return result, true
		}
	}
	return nil, false
}

func isValidEnds(chain []Domino) bool {
	if len(chain) == 0 {
		return true
	}
	return chain[0][0] == chain[len(chain)-1][1]
}

func flip(d Domino) Domino {
	return Domino{d[1], d[0]}
}