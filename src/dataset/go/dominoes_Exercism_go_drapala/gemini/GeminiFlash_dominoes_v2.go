package dominoes

// Domino represents a single domino.
type Domino [2]int

func MakeChain(input []Domino) ([]Domino, bool) {
	n := len(input)
	if n == 0 {
		return []Domino{}, true
	}

	for start := 0; start < n; start++ {
		chain, used := []Domino{input[start]}, make([]bool, n)
		used[start] = true
		if findChain(input, chain, used, n) {
			if chain[0][0] == chain[len(chain)-1][1] {
				return chain, true
			}
		}
	}

	return []Domino{}, false
}

func findChain(input []Domino, chain []Domino, used []bool, n int) bool {
	if len(chain) == n {
		return true
	}

	last := chain[len(chain)-1][1]

	for i := 0; i < n; i++ {
		if !used[i] {
			if input[i][0] == last {
				newChain := append(chain, input[i])
				used[i] = true
				if findChain(input, newChain, used, n) {
					return true
				}
				used[i] = false // Backtrack
			} else if input[i][1] == last {
				newChain := append(chain, Domino{input[i][1], input[i][0]})
				used[i] = true
				if findChain(input, newChain, used, n) {
					return true
				}
				used[i] = false // Backtrack
			}
		}
	}

	return false
}