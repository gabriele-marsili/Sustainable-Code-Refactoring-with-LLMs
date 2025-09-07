package dominoes

type Domino = [2]int

func MakeChain(dominoes []Domino) ([]Domino, bool) {
	if len(dominoes) == 0 {
		return []Domino{}, true
	}

	var backtrack func(chain []Domino, remaining map[Domino]int) bool
	backtrack = func(chain []Domino, remaining map[Domino]int) bool {
		if len(remaining) == 0 {
			return chain[0][0] == chain[len(chain)-1][1]
		}

		tail := chain[len(chain)-1][1]
		for d, count := range remaining {
			if count == 0 {
				continue
			}

			// Try matching domino as is
			if d[0] == tail {
				remaining[d]--
				if backtrack(append(chain, d), remaining) {
					return true
				}
				remaining[d]++
			}

			// Try matching domino flipped
			if d[1] == tail {
				flipped := Domino{d[1], d[0]}
				remaining[d]--
				if backtrack(append(chain, flipped), remaining) {
					return true
				}
				remaining[d]++
			}
		}
		return false
	}

	// Count occurrences of each domino
	remaining := make(map[Domino]int)
	for _, d := range dominoes {
		if d[0] > d[1] {
			d = Domino{d[1], d[0]}
		}
		remaining[d]++
	}

	// Start backtracking with the first domino
	first := dominoes[0]
	if backtrack([]Domino{first}, remaining) {
		return dominoes, true
	}
	return nil, false
}