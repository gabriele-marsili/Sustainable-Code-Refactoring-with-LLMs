package dominoes

type Domino [2]int

func MakeChain(input []Domino) (chain []Domino, ok bool) {
	if len(input) == 0 {
		return input, true
	}
	
	used := make([]bool, len(input))
	chain = make([]Domino, 0, len(input))
	
	return makeChain(input, used, chain, 0)
}

func makeChain(dominoes []Domino, used []bool, chain []Domino, depth int) (result []Domino, ok bool) {
	if depth == len(dominoes) {
		return chain, isValidLoop(chain)
	}
	
	if depth > 0 && !isValidConnection(chain[depth-1], chain[0]) {
		return nil, false
	}
	
	for i := 0; i < len(dominoes); i++ {
		if used[i] {
			continue
		}
		
		domino := dominoes[i]
		
		if depth == 0 || canConnect(chain[depth-1], domino) {
			used[i] = true
			chain = append(chain, domino)
			
			if result, ok := makeChain(dominoes, used, chain, depth+1); ok {
				return result, true
			}
			
			chain = chain[:len(chain)-1]
			used[i] = false
		}
		
		if domino[0] != domino[1] {
			flipped := Domino{domino[1], domino[0]}
			if depth == 0 || canConnect(chain[depth-1], flipped) {
				used[i] = true
				chain = append(chain, flipped)
				
				if result, ok := makeChain(dominoes, used, chain, depth+1); ok {
					return result, true
				}
				
				chain = chain[:len(chain)-1]
				used[i] = false
			}
		}
	}
	
	return nil, false
}

func canConnect(prev, curr Domino) bool {
	return prev[1] == curr[0]
}

func isValidConnection(last, first Domino) bool {
	return last[1] == first[0]
}

func isValidLoop(chain []Domino) bool {
	if len(chain) == 0 {
		return true
	}
	if len(chain) == 1 {
		return chain[0][0] == chain[0][1]
	}
	return chain[len(chain)-1][1] == chain[0][0]
}

func flip(d Domino) (flipped Domino) {
	return Domino{d[1], d[0]}
}