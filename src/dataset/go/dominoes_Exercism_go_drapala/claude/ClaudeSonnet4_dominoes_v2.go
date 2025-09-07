package dominoes

// Define the Domino type here.
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
	
	// Pre-allocate result slice with exact capacity
	result := make([]Domino, 0, len(input))
	used := make([]bool, len(input))
	
	// Try starting with each domino
	for i := 0; i < len(input); i++ {
		result = result[:0] // Reset slice length without reallocating
		for j := range used {
			used[j] = false
		}
		
		// Try both orientations of the starting domino
		if tryBuild(input, used, result, input[i][0], input[i][1], i, len(input)) {
			return append(result, input[i]), true
		}
		if input[i][0] != input[i][1] && tryBuild(input, used, result, input[i][1], input[i][0], i, len(input)) {
			return append(result, Domino{input[i][1], input[i][0]}), true
		}
	}
	
	return nil, false
}

func tryBuild(input []Domino, used []bool, result []Domino, start, end int, startIdx, target int) bool {
	used[startIdx] = true
	
	if len(result) == target-1 {
		// Check if we can close the chain
		return start == end
	}
	
	// Find next domino that connects to current end
	for i := 0; i < len(input); i++ {
		if used[i] {
			continue
		}
		
		domino := input[i]
		
		// Try connecting with domino[0] matching current end
		if domino[0] == end {
			result = append(result, domino)
			if tryBuild(input, used, result, start, domino[1], i, target) {
				return true
			}
			result = result[:len(result)-1] // Backtrack
		}
		
		// Try connecting with domino[1] matching current end (if different orientation)
		if domino[1] == end && domino[0] != domino[1] {
			flipped := Domino{domino[1], domino[0]}
			result = append(result, flipped)
			if tryBuild(input, used, result, start, domino[0], i, target) {
				return true
			}
			result = result[:len(result)-1] // Backtrack
		}
	}
	
	used[startIdx] = false
	return false
}