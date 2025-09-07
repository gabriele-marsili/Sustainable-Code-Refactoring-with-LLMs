package dominoes

type Domino = [2]int

func MakeChain(dominoes []Domino) ([]Domino, bool) {
	n := len(dominoes)
	if n == 0 {
		return []Domino{}, true
	}

	for start := 0; start < n; start++ {
		chain, found := findChain(dominoes, start)
		if found {
			return chain, true
		}
	}

	return nil, false
}

func findChain(dominoes []Domino, start int) ([]Domino, bool) {
	n := len(dominoes)
	used := make([]bool, n)
	chain := make([]Domino, 0, n)
	chain = append(chain, dominoes[start])
	used[start] = true

	if solve(dominoes, used, chain) {
		return chain, true
	}

	// Try flipping the starting domino
	chain = []Domino{{dominoes[start][1], dominoes[start][0]}}
	if solve(dominoes, used, chain) {
		return chain, true
	}

	return nil, false
}

func solve(dominoes []Domino, used []bool, chain []Domino) bool {
	n := len(dominoes)
	if len(chain) == n {
		if chain[0][0] == chain[n-1][1] {
			return true
		}
		return false
	}

	tail := chain[len(chain)-1][1]
	for i := 0; i < n; i++ {
		if !used[i] {
			// Try the domino as is
			if dominoes[i][0] == tail {
				used[i] = true
				newChain := append(chain, dominoes[i])
				if solve(dominoes, used, newChain) {
					return true
				}
				used[i] = false // Backtrack
			}

			// Try flipping the domino
			if dominoes[i][1] == tail {
				used[i] = true
				newChain := append(chain, Domino{dominoes[i][1], dominoes[i][0]})
				if solve(dominoes, used, newChain) {
					return true
				}
				used[i] = false // Backtrack
			}
		}
	}

	return false
}