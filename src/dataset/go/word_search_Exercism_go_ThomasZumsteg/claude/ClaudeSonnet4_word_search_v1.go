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
	
	// Process slices directly without channel overhead
	for rStart, row := range puzzle {
		if len(row) == 0 {
			continue
		}
		for cStart := range row {
			start := [2]int{cStart, rStart}
			maxLen := max(len(puzzle)-rStart, len(row)-cStart)
			
			for l := 2; l <= maxLen; l++ {
				// Check bounds once per direction
				if cStart+l <= len(row) {
					rowWord := puzzle[rStart][cStart : cStart+l]
					if wordSet[rowWord] {
						rowStop := [2]int{cStart + l - 1, rStart}
						matches[rowWord] = [2][2]int{start, rowStop}
					}
					// Check reverse
					if revWord := reverseString(rowWord); wordSet[revWord] {
						rowStop := [2]int{cStart + l - 1, rStart}
						matches[revWord] = [2][2]int{rowStop, start}
					}
				}
				
				if rStart+l <= len(puzzle) {
					colWord := getColOptimized(puzzle, rStart, cStart, l)
					if colWord != "" {
						if wordSet[colWord] {
							colStop := [2]int{cStart, rStart + l - 1}
							matches[colWord] = [2][2]int{start, colStop}
						}
						// Check reverse
						if revWord := reverseString(colWord); wordSet[revWord] {
							colStop := [2]int{cStart, rStart + l - 1}
							matches[revWord] = [2][2]int{colStop, start}
						}
					}
				}
				
				if rStart+l <= len(puzzle) && cStart+l <= len(row) {
					diaWord := getDiaOptimized(puzzle, rStart, cStart, l)
					if diaWord != "" {
						if wordSet[diaWord] {
							diaStop := [2]int{cStart + l - 1, rStart + l - 1}
							matches[diaWord] = [2][2]int{start, diaStop}
						}
						// Check reverse
						if revWord := reverseString(diaWord); wordSet[revWord] {
							diaStop := [2]int{cStart + l - 1, rStart + l - 1}
							matches[revWord] = [2][2]int{diaStop, start}
						}
					}
				}
			}
		}
	}
	return matches, nil
}

/*contains check the array contains an item.*/
func contains(match string, matches []string) bool {
	for _, m := range matches {
		if m == match {
			return true
		}
	}
	return false
}

/*makeSlices generates all word slices in the puzzle.*/
func makeSlices(puzzle []string, slices chan slice) {
	var sliceList [3]slice
	for rStart, row := range puzzle {
		for cStart := range row {
			start := [2]int{cStart, rStart}
			for l := 2; l+rStart <= len(row) || l+cStart < len(puzzle); l++ {
				rowWord := getRow(puzzle, rStart, cStart, l)
				rowStop := [2]int{cStart + l - 1, rStart}
				sliceList[0] = slice{rowWord, [2][2]int{start, rowStop}}

				colWord := getCol(puzzle, rStart, cStart, l)
				colStop := [2]int{cStart, rStart + l - 1}
				sliceList[1] = slice{colWord, [2][2]int{start, colStop}}

				diaWord := getDia(puzzle, rStart, cStart, l)
				diaStop := [2]int{cStart + l - 1, rStart + l - 1}
				sliceList[2] = slice{diaWord, [2][2]int{start, diaStop}}
				for _, s := range sliceList {
					if s.word != "" {
						slices <- s
						slices <- slice{reverse(s.word), [2][2]int{s.pos[1], s.pos[0]}}
					}
				}
			}
		}
	}
	close(slices)
}

/*getDiaOptimized gets a diagonal slice with bounds checking.*/
func getDiaOptimized(puzzle []string, row, col, length int) string {
	if row+length > len(puzzle) {
		return ""
	}
	// Pre-allocate with known capacity
	runes := make([]byte, 0, length)
	for i := 0; i < length; i++ {
		if col+i >= len(puzzle[row+i]) {
			return ""
		}
		runes = append(runes, puzzle[row+i][col+i])
	}
	return string(runes)
}

/*getDia gets a diagonal slice.*/
func getDia(puzzle []string, row, col, length int) string {
	if len(puzzle) <= row+length || len(puzzle[row+length]) <= col+length {
		return ""
	}
	var runes []byte
	for i := 0; i < length; i++ {
		runes = append(runes, puzzle[row+i][col+i])
	}
	return string(runes)
}

/*getRow gets a row slice.*/
func getRow(puzzle []string, row, col, length int) string {
	if len(puzzle[row]) < col+length {
		return ""
	}
	return puzzle[row][col : col+length]
}

/*getColOptimized gets a column slice with bounds checking.*/
func getColOptimized(puzzle []string, row, col, length int) string {
	if row+length > len(puzzle) {
		return ""
	}
	// Pre-allocate with known capacity
	runes := make([]byte, 0, length)
	for i := row; i < row+length; i++ {
		if col >= len(puzzle[i]) {
			return ""
		}
		runes = append(runes, puzzle[i][col])
	}
	return string(runes)
}

/*getCol gets a column slice.*/
func getCol(puzzle []string, row, col, length int) string {
	if len(puzzle) < row+length {
		return ""
	}
	var runes []byte
	for i := row; i < row+length; i++ {
		runes = append(runes, puzzle[i][col])
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

/*reverse reverses a string.*/
func reverse(word string) string {
	runes := []rune(word)
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