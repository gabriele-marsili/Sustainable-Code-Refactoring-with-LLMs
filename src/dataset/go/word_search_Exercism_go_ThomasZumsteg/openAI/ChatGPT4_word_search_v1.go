package wordsearch

const TestVersion = 1

type slice struct {
	word string
	pos  [2][2]int
}

func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	wordSet := make(map[string]struct{}, len(words))
	for _, word := range words {
		wordSet[word] = struct{}{}
	}

	matches := make(map[string][2][2]int)
	slices := make(chan slice, 100) // Buffered channel to reduce blocking
	go makeSlices(puzzle, slices)

	for wordSlice := range slices {
		if _, exists := wordSet[wordSlice.word]; exists {
			matches[wordSlice.word] = wordSlice.pos
		}
	}
	return matches, nil
}

func makeSlices(puzzle []string, slices chan slice) {
	defer close(slices)
	for rStart, row := range puzzle {
		for cStart := range row {
			start := [2]int{cStart, rStart}
			for l := 2; l+rStart <= len(puzzle) || l+cStart <= len(row); l++ {
				if cStart+l <= len(row) {
					rowWord := puzzle[rStart][cStart : cStart+l]
					rowStop := [2]int{cStart + l - 1, rStart}
					sendSlice(rowWord, start, rowStop, slices)
				}

				if rStart+l <= len(puzzle) {
					colWord := getCol(puzzle, rStart, cStart, l)
					colStop := [2]int{cStart, rStart + l - 1}
					sendSlice(colWord, start, colStop, slices)
				}

				if rStart+l <= len(puzzle) && cStart+l <= len(row) {
					diaWord := getDia(puzzle, rStart, cStart, l)
					diaStop := [2]int{cStart + l - 1, rStart + l - 1}
					sendSlice(diaWord, start, diaStop, slices)
				}
			}
		}
	}
}

func sendSlice(word string, start, stop [2]int, slices chan slice) {
	if word != "" {
		slices <- slice{word, [2][2]int{start, stop}}
		slices <- slice{reverse(word), [2][2]int{stop, start}}
	}
}

func getDia(puzzle []string, row, col, length int) string {
	if row+length > len(puzzle) || col+length > len(puzzle[row]) {
		return ""
	}
	runes := make([]byte, length)
	for i := 0; i < length; i++ {
		runes[i] = puzzle[row+i][col+i]
	}
	return string(runes)
}

func getCol(puzzle []string, row, col, length int) string {
	if row+length > len(puzzle) {
		return ""
	}
	runes := make([]byte, length)
	for i := 0; i < length; i++ {
		runes[i] = puzzle[row+i][col]
	}
	return string(runes)
}

func reverse(word string) string {
	runes := []rune(word)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}