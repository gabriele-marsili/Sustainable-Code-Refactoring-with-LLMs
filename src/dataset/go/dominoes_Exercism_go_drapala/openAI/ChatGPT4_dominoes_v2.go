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
				result = append([]Domino{}, chain...)
				return true
			}
			return false
		}

		for i, domino := range input {
			if used[i] {
				continue
			}

			used[i] = true
			if domino.Left == lastRight {
				if backtrack(append(chain, domino), domino.Right) {
					return true
				}
			} else if domino.Right == lastRight {
				if backtrack(append(chain, Domino{Left: domino.Right, Right: domino.Left}), domino.Left) {
					return true
				}
			}
			used[i] = false
		}
		return false
	}

	if backtrack([]Domino{}, input[0].Left) {
		return result, true
	}
	return nil, false
}