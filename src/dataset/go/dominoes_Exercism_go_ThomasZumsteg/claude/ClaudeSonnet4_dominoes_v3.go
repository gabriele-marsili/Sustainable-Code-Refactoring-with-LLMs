package dominoes

type Domino = [2]int

func MakeChain(dominoes []Domino) ([]Domino, bool) {
	if len(dominoes) == 0 {
		return []Domino{}, true
	}
	
	used := make([]bool, len(dominoes))
	chain := make([]Domino, 0, len(dominoes))
	
	for i := 0; i < len(dominoes); i++ {
		used[i] = true
		chain = append(chain, dominoes[i])
		
		if backtrack(dominoes, used, chain) {
			return chain, true
		}
		
		dominoes[i][0], dominoes[i][1] = dominoes[i][1], dominoes[i][0]
		chain[0] = dominoes[i]
		
		if backtrack(dominoes, used, chain) {
			return chain, true
		}
		
		dominoes[i][0], dominoes[i][1] = dominoes[i][1], dominoes[i][0]
		used[i] = false
		chain = chain[:0]
	}
	
	return nil, false
}

func backtrack(dominoes []Domino, used []bool, chain []Domino) bool {
	if len(chain) == len(dominoes) {
		return chain[0][0] == chain[len(chain)-1][1]
	}
	
	tail := chain[len(chain)-1][1]
	
	for i := 0; i < len(dominoes); i++ {
		if used[i] {
			continue
		}
		
		var nextDomino Domino
		canUse := false
		
		if dominoes[i][0] == tail {
			nextDomino = dominoes[i]
			canUse = true
		} else if dominoes[i][1] == tail {
			nextDomino = Domino{dominoes[i][1], dominoes[i][0]}
			canUse = true
		}
		
		if canUse {
			used[i] = true
			chain = append(chain, nextDomino)
			
			if backtrack(dominoes, used, chain) {
				return true
			}
			
			chain = chain[:len(chain)-1]
			used[i] = false
		}
	}
	
	return false
}