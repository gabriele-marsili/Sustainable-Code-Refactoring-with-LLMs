package dominoes

type Domino [2]int

func MakeChain(input []Domino) ([]Domino, bool) {
	if len(input) == 0 {
		return []Domino{}, true
	}
	
	if len(input) == 1 {
		if input[0][0] == input[0][1] {
			return input, true
		}
		return nil, false
	}
	
	used := make([]bool, len(input))
	chain := make([]Domino, 0, len(input))
	
	for i := 0; i < len(input); i++ {
		used[i] = true
		chain = append(chain, input[i])
		
		if buildChain(input, used, chain, input[i][1]) {
			return chain, true
		}
		
		if input[i][0] != input[i][1] {
			chain[0] = Domino{input[i][1], input[i][0]}
			if buildChain(input, used, chain, input[i][0]) {
				return chain, true
			}
		}
		
		used[i] = false
		chain = chain[:0]
	}
	
	return nil, false
}

func buildChain(input []Domino, used []bool, chain []Domino, lastValue int) bool {
	if len(chain) == len(input) {
		return chain[0][0] == lastValue
	}
	
	for i := 0; i < len(input); i++ {
		if used[i] {
			continue
		}
		
		var nextDomino Domino
		var nextValue int
		
		if input[i][0] == lastValue {
			nextDomino = input[i]
			nextValue = input[i][1]
		} else if input[i][1] == lastValue {
			nextDomino = Domino{input[i][1], input[i][0]}
			nextValue = input[i][0]
		} else {
			continue
		}
		
		used[i] = true
		chain = append(chain, nextDomino)
		
		if buildChain(input, used, chain, nextValue) {
			return true
		}
		
		used[i] = false
		chain = chain[:len(chain)-1]
	}
	
	return false
}