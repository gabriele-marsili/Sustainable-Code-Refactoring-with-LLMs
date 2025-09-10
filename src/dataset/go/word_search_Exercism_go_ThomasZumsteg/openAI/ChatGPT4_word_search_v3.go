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

	slices := make(chan slice, len(puzzle)*len(puzzle[0]))
	matches := make(map[string][2][2]int)

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
				if rowWord, rowStop := getRow(puzzle, rStart, cStart, l); rowWord != "" {
					slices <- slice{rowWord, [2][2]int{start, rowStop}}
					slices <- slice{reverse(rowWord), [2][2]int{rowStop, start}}
				}
				if colWord, colStop := getCol(puzzle, rStart, cStart, l); colWord != "" {
					slices <- slice{colWord, [2][2]int{start, colStop}}
					slices <- slice{reverse(colWord), [2][2]int{colStop, start}}
				}
				if diaWord, diaStop := getDia(puzzle, rStart, cStart, l); diaWord != "" {
					slices <- slice{diaWord, [2][2]int{start, diaStop}}
					slices <- slice{reverse(diaWord), [2][2]int{diaStop, start}}
				}
			}
		}
	}
}

func getDia(puzzle []string, row, col, length int) (string, [2]int) {
	if row+length > len(puzzle) || col+length > len(puzzle[row]) {
		return "", [2]int{}
	}
	runes := make([]byte, length)
	for i := 0; i < length; i++ {
		runes[i] = puzzle[row+i][col+i]
	}
	return string(runes), [2]int{col + length - 1, row + length - 1}
}

func getRow(puzzle []string, row, col, length int) (string, [2]int) {
	if col+length > len(puzzle[row]) {
		return "", [2]int{}
	}
	return puzzle[row][col : col+length], [2]int{col + length - 1, row}
}

func getCol(puzzle []string, row, col, length int) (string, [2]int) {
	if row+length > len(puzzle) {
		return "", [2]int{}
	}
	runes := make([]byte, length)
	for i := 0; i < length; i++ {
		runes[i] = puzzle[row+i][col]
	}
	return string(runes), [2]int{col, row + length - 1}
}

func reverse(word string) string {
	runes := []rune(word)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}