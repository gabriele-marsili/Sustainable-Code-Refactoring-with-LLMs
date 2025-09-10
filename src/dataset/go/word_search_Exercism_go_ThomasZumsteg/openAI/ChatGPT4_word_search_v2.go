package wordsearch

import "sync"

// TestVersion is the version of the unit test that this will pass
const TestVersion = 1

// slice is a slice of the puzzle and its starting and stopping position
type slice struct {
	word string
	pos  [2][2]int
}

// Solve searches the puzzle for instances of words.
func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	wordSet := make(map[string]struct{}, len(words))
	for _, word := range words {
		wordSet[word] = struct{}{}
	}

	slices := make(chan slice)
	matches := make(map[string][2][2]int)
	var wg sync.WaitGroup

	go func() {
		wg.Add(1)
		makeSlices(puzzle, slices, &wg)
	}()

	go func() {
		wg.Wait()
		close(slices)
	}()

	for wordSlice := range slices {
		if _, found := wordSet[wordSlice.word]; found {
			matches[wordSlice.word] = wordSlice.pos
		}
	}

	return matches, nil
}

// makeSlices generates all word slices in the puzzle.
func makeSlices(puzzle []string, slices chan slice, wg *sync.WaitGroup) {
	defer wg.Done()
	for rStart, row := range puzzle {
		for cStart := range row {
			start := [2]int{cStart, rStart}
			for l := 2; l+rStart <= len(puzzle) || l+cStart <= len(row); l++ {
				rowWord := getRow(puzzle, rStart, cStart, l)
				if rowWord != "" {
					rowStop := [2]int{cStart + l - 1, rStart}
					slices <- slice{rowWord, [2][2]int{start, rowStop}}
					slices <- slice{reverse(rowWord), [2][2]int{rowStop, start}}
				}

				colWord := getCol(puzzle, rStart, cStart, l)
				if colWord != "" {
					colStop := [2]int{cStart, rStart + l - 1}
					slices <- slice{colWord, [2][2]int{start, colStop}}
					slices <- slice{reverse(colWord), [2][2]int{colStop, start}}
				}

				diaWord := getDia(puzzle, rStart, cStart, l)
				if diaWord != "" {
					diaStop := [2]int{cStart + l - 1, rStart + l - 1}
					slices <- slice{diaWord, [2][2]int{start, diaStop}}
					slices <- slice{reverse(diaWord), [2][2]int{diaStop, start}}
				}
			}
		}
	}
}

// getDia gets a diagonal slice.
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

// getRow gets a row slice.
func getRow(puzzle []string, row, col, length int) string {
	if col+length > len(puzzle[row]) {
		return ""
	}
	return puzzle[row][col : col+length]
}

// getCol gets a column slice.
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

// reverse reverses a string.
func reverse(word string) string {
	runes := []rune(word)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}