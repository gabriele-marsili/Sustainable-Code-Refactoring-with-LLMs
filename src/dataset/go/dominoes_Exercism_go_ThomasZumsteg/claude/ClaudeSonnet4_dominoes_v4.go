package dominoes

type Domino = [2]int

func MakeChain(dominoes []Domino) ([]Domino, bool) {
	n := len(dominoes)
	if n == 0 {
		return []Domino{}, true
	}
	
	used := make([]bool, n)
	chain := make([]Domino, 0, n)
	
	var backtrack func(head, tail int) bool
	backtrack = func(head, tail int) bool {
		if len(chain) == n {
			return head == tail
		}
		
		for i := 0; i < n; i++ {
			if used[i] {
				continue
			}
			
			d := dominoes[i]
			if d[0] == tail {
				used[i] = true
				chain = append(chain, d)
				if backtrack(head, d[1]) {
					return true
				}
				chain = chain[:len(chain)-1]
				used[i] = false
			} else if d[1] == tail {
				flipped := Domino{d[1], d[0]}
				used[i] = true
				chain = append(chain, flipped)
				if backtrack(head, d[0]) {
					return true
				}
				chain = chain[:len(chain)-1]
				used[i] = false
			}
		}
		return false
	}
	
	for i := 0; i < n; i++ {
		used[i] = true
		chain = append(chain, dominoes[i])
		if backtrack(dominoes[i][0], dominoes[i][1]) {
			result := make([]Domino, len(chain))
			copy(result, chain)
			return result, true
		}
		chain = chain[:0]
		used[i] = false
	}
	
	return nil, false
}