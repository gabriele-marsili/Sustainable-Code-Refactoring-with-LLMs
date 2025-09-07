package dominoes

type Domino = [2]int

func MakeChain(dominoes []Domino) ([]Domino, bool) {
	if len(dominoes) == 0 {
		return []Domino{}, true
	}
	
	// Pre-calculate total sum to check if chain is possible
	var sum int
	for _, d := range dominoes {
		sum += d[0] + d[1]
	}
	if sum%2 != 0 {
		return nil, false
	}
	
	used := make([]bool, len(dominoes))
	chain := make([]Domino, 0, len(dominoes))
	
	// Try each domino as starting point
	for start := 0; start < len(dominoes); start++ {
		if backtrack(dominoes, used, chain, start, -1) {
			return chain, true
		}
	}
	
	return nil, false
}

func backtrack(dominoes []Domino, used []bool, chain []Domino, current int, expectedLeft int) bool {
	if current != -1 {
		d := dominoes[current]
		if expectedLeft != -1 && d[0] != expectedLeft && d[1] != expectedLeft {
			return false
		}
		
		// Orient domino correctly
		if expectedLeft != -1 && d[1] == expectedLeft {
			d = Domino{d[1], d[0]}
		}
		
		chain = append(chain, d)
		used[current] = true
		expectedLeft = d[1]
	}
	
	// Check if we have a complete chain
	if len(chain) == len(dominoes) {
		result := len(chain) == 0 || chain[0][0] == chain[len(chain)-1][1]
		if current != -1 {
			used[current] = false
			chain = chain[:len(chain)-1]
		}
		return result
	}
	
	// Try remaining dominoes
	for i := 0; i < len(dominoes); i++ {
		if !used[i] {
			if backtrack(dominoes, used, chain, i, expectedLeft) {
				return true
			}
		}
	}
	
	// Backtrack
	if current != -1 {
		used[current] = false
		chain = chain[:len(chain)-1]
	}
	
	return false
}