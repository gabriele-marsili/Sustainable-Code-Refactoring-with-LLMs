package dominoes

// Domino represents a single domino.
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
	var solve func(int, []Domino) bool

	solve = func(currentIndex int, currentChain []Domino) bool {
		if len(currentChain) == n {
			if currentChain[0][0] == currentChain[len(currentChain)-1][1] {
				return true
			}
			return false
		}

		for i := 0; i < n; i++ {
			if !used[i] {
				domino := input[i]
				if len(currentChain) == 0 || domino[0] == currentChain[len(currentChain)-1][1] {
					used[i] = true
					newChain := append(currentChain, domino)
					if solve(i, newChain) {
						return true
					}
					used[i] = false
				} else if len(currentChain) == 0 || domino[1] == currentChain[len(currentChain)-1][1] {
					domino[0], domino[1] = domino[1], domino[0]
					used[i] = true
					newChain := append(currentChain, domino)
					if solve(i, newChain) {
						return true
					}
					used[i] = false
				}
			}
		}
		return false
	}

	used[start] = true
	if solve(start, []Domino{input[start]}) {
		
		result := make([]Domino, 0, n)
		result = append(result, input[start])
		
		currentIndex := start
		
		for i := 1; i < n; i++ {
			for j := 0; j < n; j++ {
				if !used[j] {
					domino := input[j]
					if domino[0] == result[len(result)-1][1] {
						result = append(result, domino)
						used[j] = true
						currentIndex = j
						break
					} else if domino[1] == result[len(result)-1][1] {
						domino[0], domino[1] = domino[1], domino[0]
						result = append(result, domino)
						used[j] = true
						currentIndex = j
						break
					}
				}
			}
		}
		
		return result, true
	}

	return []Domino{}, false
}