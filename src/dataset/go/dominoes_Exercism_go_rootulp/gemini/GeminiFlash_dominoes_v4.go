package dominoes

type Domino [2]int

func MakeChain(input []Domino) (chain []Domino, ok bool) {
	if len(input) == 0 {
		return input, true
	}
	return makeChain(input, []Domino{}, map[int]bool{})
}

func makeChain(remaining []Domino, chain []Domino, used map[int]bool) (result []Domino, ok bool) {
	if len(remaining) == 0 {
		return chain, isValid(chain)
	}

	if len(chain) > 1 && chain[len(chain)-2][1] != chain[len(chain)-1][0] {
		return nil, false
	}

	for i := 0; i < len(remaining); i++ {
		if used[i] {
			continue
		}

		v := remaining[i]

		newChain1 := append(chain, v)
		newUsed1 := make(map[int]bool)
		for k, val := range used {
			newUsed1[k] = val
		}
		newUsed1[i] = true
		newRemaining1 := make([]Domino, 0, len(remaining)-1)
		for j := 0; j < len(remaining); j++ {
			if !newUsed1[j] {
				newRemaining1 = append(newRemaining1, remaining[j])
			}
		}

		result, ok = makeChain(newRemaining1, newChain1, newUsed1)
		if ok {
			return result, ok
		}

		vFlipped := Domino{v[1], v[0]}
		newChain2 := append(chain, vFlipped)
		newUsed2 := make(map[int]bool)
		for k, val := range used {
			newUsed2[k] = val
		}
		newUsed2[i] = true
		newRemaining2 := make([]Domino, 0, len(remaining)-1)
		for j := 0; j < len(remaining); j++ {
			if !newUsed2[j] {
				newRemaining2 = append(newRemaining2, remaining[j])
			}
		}

		result, ok = makeChain(newRemaining2, newChain2, newUsed2)
		if ok {
			return result, ok
		}
	}
	return nil, false
}

func isValid(chain []Domino) bool {
	if len(chain) == 0 {
		return true
	}
	if chain[0][0] != chain[len(chain)-1][1] {
		return false
	}
	for i := 0; i < len(chain)-1; i++ {
		if chain[i][1] != chain[i+1][0] {
			return false
		}
	}
	return true
}