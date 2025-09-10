package wordsearch

const TestVersion = 1

type slice struct {
	word string
	pos  [2][2]int
}

func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	matches := make(map[string][2][2]int)
	slices := makeSlices(puzzle)

	wordMap := make(map[string]bool, len(words))
	for _, word := range words {
		wordMap[word] = true
	}

	for _, wordSlice := range slices {
		if wordMap[wordSlice.word] {
			matches[wordSlice.word] = wordSlice.pos
		}
	}
	return matches, nil
}

func makeSlices(puzzle []string) []slice {
	var slices []slice
	for rStart, row := range puzzle {
		for cStart := range row {
			start := [2]int{cStart, rStart}
			maxLen := max(len(puzzle)-cStart, len(row)-rStart)

			for l := 2; l <= maxLen; l++ {
				rowWord := getRow(puzzle, rStart, cStart, l)
				if rowWord != "" {
					rowStop := [2]int{cStart + l - 1, rStart}
					s := slice{rowWord, [2][2]int{start, rowStop}}
					slices = append(slices, s)
					slices = append(slices, slice{reverse(rowWord), [2][2]int{s.pos[1], s.pos[0]}})
				}

				colWord := getCol(puzzle, rStart, cStart, l)
				if colWord != "" {
					colStop := [2]int{cStart, rStart + l - 1}
					s := slice{colWord, [2][2]int{start, colStop}}
					slices = append(slices, s)
					slices = append(slices, slice{reverse(colWord), [2][2]int{s.pos[1], s.pos[0]}})
				}

				diaWord := getDia(puzzle, rStart, cStart, l)
				if diaWord != "" {
					diaStop := [2]int{cStart + l - 1, rStart + l - 1}
					s := slice{diaWord, [2][2]int{start, diaStop}}
					slices = append(slices, s)
					slices = append(slices, slice{reverse(diaWord), [2][2]int{s.pos[1], s.pos[0]}})
				}
			}
		}
	}
	return slices
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

func getRow(puzzle []string, row, col, length int) string {
	if col+length > len(puzzle[row]) {
		return ""
	}
	return puzzle[row][col : col+length]
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
	n := len(runes)
	for i := 0; i < n/2; i++ {
		runes[i], runes[n-i-1] = runes[n-i-1], runes[i]
	}
	return string(runes)
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}