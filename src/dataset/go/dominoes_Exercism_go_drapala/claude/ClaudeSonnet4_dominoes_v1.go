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
	
	// Count occurrences of each number
	counts := make(map[int]int)
	for _, domino := range input {
		counts[domino[0]]++
		counts[domino[1]]++
	}
	
	// Check if chain is possible (at most 2 odd counts)
	oddCount := 0
	for _, count := range counts {
		if count%2 == 1 {
			oddCount++
		}
	}
	if oddCount != 0 && oddCount != 2 {
		return nil, false
	}
	
	// Build adjacency list
	adj := make(map[int][]int)
	for i, domino := range input {
		adj[domino[0]] = append(adj[domino[0]], i)
		if domino[0] != domino[1] {
			adj[domino[1]] = append(adj[domino[1]], i)
		}
	}
	
	// Find starting point
	start := input[0][0]
	if oddCount == 2 {
		for num, count := range counts {
			if count%2 == 1 {
				start = num
				break
			}
		}
	}
	
	// Try to build chain using DFS
	used := make([]bool, len(input))
	result := make([]Domino, 0, len(input))
	
	if dfs(input, adj, used, result, start, len(input)) {
		return result, true
	}
	
	return nil, false
}

func dfs(input []Domino, adj map[int][]int, used []bool, result []Domino, current int, remaining int) bool {
	if remaining == 0 {
		if len(result) == 0 {
			return true
		}
		// Check if chain forms a loop
		return result[0][0] == current || result[0][1] == current
	}
	
	for _, idx := range adj[current] {
		if used[idx] {
			continue
		}
		
		domino := input[idx]
		var next int
		var oriented Domino
		
		if domino[0] == current {
			next = domino[1]
			oriented = domino
		} else if domino[1] == current {
			next = domino[0]
			oriented = Domino{domino[1], domino[0]}
		} else {
			continue
		}
		
		used[idx] = true
		result = append(result, oriented)
		
		if dfs(input, adj, used, result, next, remaining-1) {
			return true
		}
		
		result = result[:len(result)-1]
		used[idx] = false
	}
	
	return false
}