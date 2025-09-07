package dominoes

type Domino [2]int

func MakeChain(input []Domino) (chain []Domino, ok bool) {
	if len(input) == 0 {
		return input, true
	}
	n := len(input)
	used := make([]bool, n)
	chain = make([]Domino, 0, n)
	return findChain(input, used, chain)
}

func findChain(remaining []Domino, used []bool, chain []Domino) ([]Domino, bool) {
	if len(chain) == len(remaining) {
		if len(chain) == 0 || chain[0][0] == chain[len(chain)-1][1] {
			return chain, true
		}
		return nil, false
	}

	for i := 0; i < len(remaining); i++ {
		if !used[i] {
			domino := remaining[i]

			// Try domino as is
			if len(chain) == 0 || chain[len(chain)-1][1] == domino[0] {
				used[i] = true
				newChain := append(chain, domino)
				if result, ok := findChain(remaining, used, newChain); ok {
					return result, true
				}
				used[i] = false // Backtrack
			}

			// Try flipped domino
			if len(chain) == 0 || chain[len(chain)-1][1] == domino[1] {
				used[i] = true
				flippedDomino := Domino{domino[1], domino[0]}
				newChain := append(chain, flippedDomino)
				if result, ok := findChain(remaining, used, newChain); ok {
					return result, true
				}
				used[i] = false // Backtrack
			}
		}
	}

	return nil, false
}