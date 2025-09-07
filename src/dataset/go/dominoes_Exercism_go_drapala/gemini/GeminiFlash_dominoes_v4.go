package dominoes

// Domino represents a domino piece.
type Domino [2]int

func MakeChain(input []Domino) ([]Domino, bool) {
	n := len(input)
	if n == 0 {
		return []Domino{}, true
	}

	for start := 0; start < n; start++ {
		chain, ok := findChain(input, start)
		if ok {
			return chain, true
		}
	}

	return []Domino{}, false
}

func findChain(input []Domino, start int) ([]Domino, bool) {
	n := len(input)
	used := make([]bool, n)
	chain := make([]Domino, 0, n)
	var buildChain func(int, []Domino, []bool) bool

	buildChain = func(currentEnd int, currentChain []Domino, currentUsed []bool) bool {
		if len(currentChain) == n {
			if currentChain[0][0] == currentEnd {
				return true
			}
			return false
		}

		for i := 0; i < n; i++ {
			if !currentUsed[i] {
				domino := input[i]
				if domino[0] == currentEnd {
					newChain := append(currentChain, domino)
					newUsed := make([]bool, n)
					copy(newUsed, currentUsed)
					newUsed[i] = true
					if buildChain(domino[1], newChain, newUsed) {
						return true
					}
				} else if domino[1] == currentEnd {
					newChain := append(currentChain, Domino{domino[1], domino[0]})
					newUsed := make([]bool, n)
					copy(newUsed, currentUsed)
					newUsed[i] = true
					if buildChain(domino[0], newChain, newUsed) {
						return true
					}
				}
			}
		}
		return false
	}

	used[start] = true
	if buildChain(input[start][1], []Domino{input[start]}, used) {
		return []Domino{input[start]}, true
	}

	// Try flipping the starting domino
	used = make([]bool, n)
	used[start] = true
	flippedStart := Domino{input[start][1], input[start][0]}
	if buildChain(input[start][0], []Domino{flippedStart}, used) {
		return []Domino{flippedStart}, true
	}

	return []Domino{}, false
}