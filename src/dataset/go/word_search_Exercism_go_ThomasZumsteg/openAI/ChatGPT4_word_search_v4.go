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
	slices := make(chan slice, len(puzzle)*len(puzzle[0])*3)

	go func() {
		makeSlices(puzzle, slices)
		close(slices)
	}()

	for wordSlice := range slices {
		if _, exists := wordSet[wordSlice.word]; exists {
			matches[wordSlice.word] = wordSlice.pos
		}
	}
	return matches, nil
}

func makeSlices(puzzle []string, slices chan slice) {
	for rStart, row := range puzzle {
		for cStart := range row {
			start := [2]int{cStart, rStart}
			for l := 2; l <= len(row)-cStart || l <= len(puzzle)-rStart; l++ {
				if cStart+l <= len(row) {
					rowWord := puzzle[rStart][cStart : cStart+l]
					rowStop := [2]int{cStart + l - 1, rStart}
					slices <- slice{rowWord, [2][2]int{start, rowStop}}
					slices <- slice{reverse(rowWord), [2][2]int{rowStop, start}}
				}
				if rStart+l <= len(puzzle) {
					colWord := getCol(puzzle, rStart, cStart, l)
					colStop := [2]int{cStart, rStart + l - 1}
					slices <- slice{colWord, [2][2]int{start, colStop}}
					slices <- slice{reverse(colWord), [2][2]int{colStop, start}}
				}
				if cStart+l <= len(row) && rStart+l <= len(puzzle) {
					diaWord := getDia(puzzle, rStart, cStart, l)
					diaStop := [2]int{cStart + l - 1, rStart + l - 1}
					slices <- slice{diaWord, [2][2]int{start, diaStop}}
					slices <- slice{reverse(diaWord), [2][2]int{diaStop, start}}
				}
			}
		}
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