package dominoes

type Domino [2]int

func MakeChain(input []Domino) ([]Domino, bool) {
	if len(input) == 0 {
		return input, true
	}

	n := len(input)
	used := make([]bool, n)
	chain := make([]Domino, 0, n)
	
	for i := 0; i < n; i++ {
		if result, ok := findChain(input, used, chain, i, false); ok {
			return result, true
		}
		if result, ok := findChain(input, used, chain, i, true); ok {
			return result, true
		}
	}

	return nil, false
}

func findChain(input []Domino, used []bool, chain []Domino, currentIndex int, flipped bool) ([]Domino, bool) {
	n := len(input)
	newChain := make([]Domino, len(chain))
	copy(newChain, chain)

	currentDomino := input[currentIndex]
	if flipped {
		currentDomino = Domino{currentDomino[1], currentDomino[0]}
	}

	newChain = append(newChain, currentDomino)

	newUsed := make([]bool, n)
	copy(newUsed, used)
	newUsed[currentIndex] = true

	if len(newChain) == n {
		if len(newChain) == 1 {
			if newChain[0][0] == newChain[0][1] {
				return newChain, true
			}
			return nil, false
		}
		if newChain[0][0] == newChain[n-1][1] {
			valid := true
			for i := 0; i < n-1; i++ {
				if newChain[i][1] != newChain[i+1][0] {
					valid = false
					break
				}
			}
			if valid {
				return newChain, true
			}
		}
		return nil, false
	}

	for i := 0; i < n; i++ {
		if !newUsed[i] {
			last := newChain[len(newChain)-1][1]
			next := input[i]
			if last == next[0] {
				if result, ok := findChain(input, newUsed, newChain, i, false); ok {
					return result, true
				}
			}
			if last == next[1] {
				if result, ok := findChain(input, newUsed, newChain, i, true); ok {
					return result, true
				}
			}
		}
	}

	return nil, false
}