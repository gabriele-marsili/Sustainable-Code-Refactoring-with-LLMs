package dominoes

type Domino [2]int

func MakeChain(input []Domino) (chain []Domino, ok bool) {
	if len(input) == 0 {
		return input, true
	}

	// Create a copy to avoid modifying the original input
	dominoes := make([]Domino, len(input))
	copy(dominoes, input)

	return findChain(dominoes, []Domino{})
}

func findChain(remaining []Domino, chain []Domino) (result []Domino, ok bool) {
	if len(remaining) == 0 {
		if len(chain) == 0 {
			return chain, true
		}
		if chain[0][0] == chain[len(chain)-1][1] {
			return chain, true
		}
		return nil, false
	}

	if len(chain) > 0 {
		if chain[len(chain)-1][1] != remaining[0][0] && chain[len(chain)-1][1] != remaining[0][1] {
			
			canFlip := false
			for i := 0; i < len(remaining); i++ {
				if chain[len(chain)-1][1] == remaining[i][0] || chain[len(chain)-1][1] == remaining[i][1] {
					canFlip = true
					break
				}
			}
			if !canFlip {
				return nil, false
			}
		}
	}

	for i := 0; i < len(remaining); i++ {
		// Try the domino as is
		if len(chain) == 0 || chain[len(chain)-1][1] == remaining[i][0] {
			newChain := make([]Domino, len(chain), len(chain)+len(remaining))
			copy(newChain, chain)
			newChain = append(newChain, remaining[i])

			newRemaining := make([]Domino, 0, len(remaining)-1)
			newRemaining = append(newRemaining, remaining[:i]...)
			newRemaining = append(newRemaining, remaining[i+1:]...)

			if result, ok = findChain(newRemaining, newChain); ok {
				return result, ok
			}
		}

		// Try the domino flipped
		if len(chain) == 0 || chain[len(chain)-1][1] == remaining[i][1] {
			flippedDomino := Domino{remaining[i][1], remaining[i][0]}

			newChain := make([]Domino, len(chain), len(chain)+len(remaining))
			copy(newChain, chain)
			newChain = append(newChain, flippedDomino)

			newRemaining := make([]Domino, 0, len(remaining)-1)
			newRemaining = append(newRemaining, remaining[:i]...)
			newRemaining = append(newRemaining, remaining[i+1:]...)

			if result, ok = findChain(newRemaining, newChain); ok {
				return result, ok
			}
		}
	}

	return nil, false
}