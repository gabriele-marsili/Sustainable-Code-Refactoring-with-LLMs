package wordsearch

//TestVersion is the verion of the unit test that this will pass
const TestVersion = 1

//Solve searches the puzzle for instances of words.
func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	matches := make(map[string][2][2]int)
	puzzleWidth := len(puzzle[0])
	puzzleHeight := len(puzzle)

	wordSet := make(map[string]bool, len(words))
	for _, word := range words {
		wordSet[word] = true
	}

	for rStart := 0; rStart < puzzleHeight; rStart++ {
		for cStart := 0; cStart < puzzleWidth; cStart++ {
			for _, word := range words {
				wordLength := len(word)

				// Check row
				if cStart+wordLength <= puzzleWidth {
					rowWord := puzzle[rStart][cStart : cStart+wordLength]
					if string(rowWord) == word {
						matches[word] = [2][2]int{{cStart, rStart}, {cStart + wordLength - 1, rStart}}
						continue // Skip other directions for this word
					}
					reversedWord := reverseString(string(rowWord))
					if reversedWord == word {
						matches[word] = [2][2]int{{cStart + wordLength - 1, rStart}, {cStart, rStart}}
						continue
					}
				}

				// Check column
				if rStart+wordLength <= puzzleHeight {
					colWord := make([]byte, wordLength)
					for i := 0; i < wordLength; i++ {
						colWord[i] = puzzle[rStart+i][cStart]
					}
					if string(colWord) == word {
						matches[word] = [2][2]int{{cStart, rStart}, {cStart, rStart + wordLength - 1}}
						continue
					}
					reversedWord := reverseString(string(colWord))
					if reversedWord == word {
						matches[word] = [2][2]int{{cStart, rStart + wordLength - 1}, {cStart, rStart}}
						continue
					}
				}

				// Check diagonal
				if rStart+wordLength <= puzzleHeight && cStart+wordLength <= puzzleWidth {
					diaWord := make([]byte, wordLength)
					for i := 0; i < wordLength; i++ {
						diaWord[i] = puzzle[rStart+i][cStart+i]
					}
					if string(diaWord) == word {
						matches[word] = [2][2]int{{cStart, rStart}, {cStart + wordLength - 1, rStart + wordLength - 1}}
						continue
					}
					reversedWord := reverseString(string(diaWord))
					if reversedWord == word {
						matches[word] = [2][2]int{{cStart + wordLength - 1, rStart + wordLength - 1}, {cStart, rStart}}
						continue
					}
				}
			}
		}
	}

	return matches, nil
}

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}