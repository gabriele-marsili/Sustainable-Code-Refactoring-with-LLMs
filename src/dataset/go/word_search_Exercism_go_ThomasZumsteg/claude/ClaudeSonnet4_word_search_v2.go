package wordsearch

//TestVersion is the verion of the unit test that this will pass
const TestVersion = 1

//slice is a slice of the puzzle and it's starting and stopping position
type slice struct {
	word string
	pos  [2][2]int
}

/*Solve searches the puzzle for instances of words.*/
func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	if len(words) == 0 || len(puzzle) == 0 {
		return make(map[string][2][2]int), nil
	}
	
	// Use map for O(1) lookup instead of O(n) slice search
	wordSet := make(map[string]bool, len(words))
	for _, word := range words {
		wordSet[word] = true
	}
	
	matches := make(map[string][2][2]int)
	
	// Process slices directly without goroutine and channel overhead
	for rStart, row := range puzzle {
		rowLen := len(row)
		for cStart := 0; cStart < rowLen; cStart++ {
			start := [2]int{cStart, rStart}
			maxLen := max(rowLen-cStart, len(puzzle)-rStart)
			
			for l := 2; l <= maxLen; l++ {
				// Check horizontal
				if cStart+l <= rowLen {
					word := puzzle[rStart][cStart : cStart+l]
					if wordSet[word] {
						matches[word] = [2][2]int{start, {cStart + l - 1, rStart}}
					}
					// Check reverse horizontal
					if reversed := reverseString(word); wordSet[reversed] {
						matches[reversed] = [2][2]int{{cStart + l - 1, rStart}, start}
					}
				}
				
				// Check vertical
				if rStart+l <= len(puzzle) {
					word := getColOptimized(puzzle, rStart, cStart, l)
					if word != "" {
						if wordSet[word] {
							matches[word] = [2][2]int{start, {cStart, rStart + l - 1}}
						}
						// Check reverse vertical
						if reversed := reverseString(word); wordSet[reversed] {
							matches[reversed] = [2][2]int{{cStart, rStart + l - 1}, start}
						}
					}
				}
				
				// Check diagonal
				if rStart+l <= len(puzzle) && cStart+l <= rowLen {
					word := getDiaOptimized(puzzle, rStart, cStart, l)
					if word != "" {
						if wordSet[word] {
							matches[word] = [2][2]int{start, {cStart + l - 1, rStart + l - 1}}
						}
						// Check reverse diagonal
						if reversed := reverseString(word); wordSet[reversed] {
							matches[reversed] = [2][2]int{{cStart + l - 1, rStart + l - 1}, start}
						}
					}
				}
			}
		}
	}
	
	return matches, nil
}

/*getDiaOptimized gets a diagonal slice with bounds checking.*/
func getDiaOptimized(puzzle []string, row, col, length int) string {
	if row+length > len(puzzle) {
		return ""
	}
	
	// Pre-allocate byte slice with known capacity
	runes := make([]byte, 0, length)
	for i := 0; i < length; i++ {
		if col+i >= len(puzzle[row+i]) {
			return ""
		}
		runes = append(runes, puzzle[row+i][col+i])
	}
	return string(runes)
}

/*getColOptimized gets a column slice with bounds checking.*/
func getColOptimized(puzzle []string, row, col, length int) string {
	if row+length > len(puzzle) {
		return ""
	}
	
	// Pre-allocate byte slice with known capacity
	runes := make([]byte, 0, length)
	for i := 0; i < length; i++ {
		if col >= len(puzzle[row+i]) {
			return ""
		}
		runes = append(runes, puzzle[row+i][col])
	}
	return string(runes)
}

/*reverseString reverses a string efficiently.*/
func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}