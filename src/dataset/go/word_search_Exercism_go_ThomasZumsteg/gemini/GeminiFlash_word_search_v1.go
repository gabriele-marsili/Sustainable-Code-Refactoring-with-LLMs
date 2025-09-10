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
	matches := make(map[string][2][2]int)
	wordSet := make(map[string]bool, len(words))
	for _, word := range words {
		wordSet[word] = true
	}

	for rStart, row := range puzzle {
		for cStart := range row {
			start := [2]int{cStart, rStart}
			for l := 2; rStart+l <= len(puzzle) || cStart+l <= len(row); l++ {
				// Row
				if cStart+l <= len(row) {
					rowWord := row[cStart : cStart+l]
					rowStop := [2]int{cStart + l - 1, rStart}
					if wordSet[rowWord] {
						matches[rowWord] = [2][2]int{start, rowStop}
					}
					reversedRowWord := reverseString(rowWord)
					if wordSet[reversedRowWord] {
						matches[reversedRowWord] = [2][2]int{rowStop, start}
					}
				}

				// Column
				if rStart+l <= len(puzzle) {
					colWord := getCol(puzzle, rStart, cStart, l)
					if colWord != "" {
						colStop := [2]int{cStart, rStart + l - 1}
						if wordSet[colWord] {
							matches[colWord] = [2][2]int{start, colStop}
						}
						reversedColWord := reverseString(colWord)
						if wordSet[reversedColWord] {
							matches[reversedColWord] = [2][2]int{colStop, start}
						}
					}
				}

				// Diagonal
				if rStart+l <= len(puzzle) && cStart+l <= len(row) {
					diaWord := getDia(puzzle, rStart, cStart, l)
					if diaWord != "" {
						diaStop := [2]int{cStart + l - 1, rStart + l - 1}
						if wordSet[diaWord] {
							matches[diaWord] = [2][2]int{start, diaStop}
						}
						reversedDiaWord := reverseString(diaWord)
						if wordSet[reversedDiaWord] {
							matches[reversedDiaWord] = [2][2]int{diaStop, start}
						}
					}
				}
			}
		}
	}

	return matches, nil
}

/*getDia gets a diagonal slice.*/
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

/*getCol gets a column slice.*/
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

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}