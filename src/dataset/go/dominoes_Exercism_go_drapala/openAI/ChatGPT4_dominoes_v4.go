package dominoes

type Domino struct {
	Left, Right int
}

func MakeChain(input []Domino) ([]Domino, bool) {
	if len(input) == 0 {
		return []Domino{}, true
	}

	used := make([]bool, len(input))
	var result []Domino

	var backtrack func(chain []Domino, lastRight int) bool
	backtrack = func(chain []Domino, lastRight int) bool {
		if len(chain) == len(input) {
			if chain[0].Left == chain[len(chain)-1].Right {
				result = append([]Domino(nil), chain...)
				return true
			}
			return false
		}

		for i, domino := range input {
			if used[i] {
				continue
			}

			if domino.Left == lastRight {
				used[i] = true
				if backtrack(append(chain, domino), domino.Right) {
					return true
				}
				used[i] = false
			} else if domino.Right == lastRight {
				used[i] = true
				if backtrack(append(chain, Domino{Left: domino.Right, Right: domino.Left}), domino.Left) {
					return true
				}
				used[i] = false
			}
		}
		return false
	}

	if backtrack([]Domino{}, input[0].Left) {
		return result, true
	}
	return nil, false
}