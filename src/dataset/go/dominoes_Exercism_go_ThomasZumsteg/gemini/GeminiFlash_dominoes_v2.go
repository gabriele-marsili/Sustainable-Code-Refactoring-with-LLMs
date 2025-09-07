package dominoes

type Domino = [2]int

func MakeChain(dominoes []Domino) ([]Domino, bool) {
	if len(dominoes) == 0 {
		return []Domino{}, true
	}

	first := dominoes[0]
	remaining := dominoes[1:]

	var solve func([]Domino, []Domino, Domino) ([]Domino, bool)
	solve = func(chain []Domino, remaining []Domino, last Domino) ([]Domino, bool) {
		if len(remaining) == 0 {
			if last[1] == first[0] {
				return chain, true
			}
			return nil, false
		}

		for i := 0; i < len(remaining); i++ {
			next := remaining[i]
			rest := make([]Domino, len(remaining)-1)
			copy(rest[:i], remaining[:i])
			copy(rest[i:], remaining[i+1:])

			if next[0] == last[1] {
				if result, ok := solve(append(chain, next), rest, next); ok {
					return result, true
				}
			} else if next[1] == last[1] {
				next[0], next[1] = next[1], next[0]
				if result, ok := solve(append(chain, next), rest, next); ok {
					return result, true
				}
			}
		}
		return nil, false
	}

	if chain, ok := solve([]Domino{first}, remaining, first); ok {
		return chain, true
	}

	first[0], first[1] = first[1], first[0]
	if chain, ok := solve([]Domino{first}, remaining, first); ok {
		return chain, true
	}

	return nil, false
}