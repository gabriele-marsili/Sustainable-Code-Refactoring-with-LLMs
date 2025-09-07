package dominoes

// Domino represents a single domino with two numbers.
type Domino [2]int

func MakeChain(input []Domino) ([]Domino, bool) {
	n := len(input)
	if n == 0 {
		return []Domino{}, true
	}

	for i := 0; i < n; i++ {
		chain, ok := findChain(input, []Domino{}, i, make([]bool, n))
		if ok {
			return chain, true
		}
	}

	return []Domino{}, false
}

func findChain(input []Domino, currentChain []Domino, currentIndex int, used []bool) ([]Domino, bool) {
	usedCopy := make([]bool, len(used))
	copy(usedCopy, used)

	if len(currentChain) == 0 {
		currentChain = append(currentChain, input[currentIndex])
		usedCopy[currentIndex] = true
	} else {
		lastDomino := currentChain[len(currentChain)-1]
		if lastDomino[1] == input[currentIndex][0] {
			currentChain = append(currentChain, input[currentIndex])
			usedCopy[currentIndex] = true
		} else if lastDomino[1] == input[currentIndex][1] {
			currentChain = append(currentChain, Domino{input[currentIndex][1], input[currentIndex][0]})
			usedCopy[currentIndex] = true
		} else {
			return []Domino{}, false
		}
	}

	if len(currentChain) == len(input) {
		if currentChain[0][0] == currentChain[len(currentChain)-1][1] {
			return currentChain, true
		}
		return []Domino{}, false
	}

	for i := 0; i < len(input); i++ {
		if !usedCopy[i] {
			chain, ok := findChain(input, append([]Domino{}, currentChain...), i, usedCopy)
			if ok {
				return chain, true
			}
		}
	}

	return []Domino{}, false
}