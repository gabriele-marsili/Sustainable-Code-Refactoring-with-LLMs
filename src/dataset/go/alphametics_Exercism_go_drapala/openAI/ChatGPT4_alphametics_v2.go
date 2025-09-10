package alphametics

import (
	"errors"
	"strings"
	"unicode"
)

func Solve(puzzle string) (map[string]int, error) {
	words := strings.FieldsFunc(puzzle, func(r rune) bool {
		return r == '+' || r == '=' || unicode.IsSpace(r)
	})

	if len(words) < 2 {
		return nil, errors.New("invalid puzzle format")
	}

	uniqueLetters := make(map[rune]bool)
	for _, word := range words {
		for _, char := range word {
			if unicode.IsLetter(char) {
				uniqueLetters[char] = true
			}
		}
	}

	if len(uniqueLetters) > 10 {
		return nil, errors.New("too many unique letters")
	}

	letters := make([]rune, 0, len(uniqueLetters))
	for letter := range uniqueLetters {
		letters = append(letters, letter)
	}

	firstLetters := make(map[rune]bool)
	for _, word := range words {
		firstLetters[rune(word[0])] = true
	}

	numbers := make([]int, 10)
	for i := range numbers {
		numbers[i] = i
	}

	var solve func(idx int, used map[int]bool, mapping map[rune]int) (map[string]int, bool)
	solve = func(idx int, used map[int]bool, mapping map[rune]int) (map[string]int, bool) {
		if idx == len(letters) {
			if isValidSolution(words, mapping) {
				result := make(map[string]int)
				for _, word := range words {
					result[word] = wordToNumber(word, mapping)
				}
				return result, true
			}
			return nil, false
		}

		currentLetter := letters[idx]
		for _, num := range numbers {
			if used[num] || (num == 0 && firstLetters[currentLetter]) {
				continue
			}
			used[num] = true
			mapping[currentLetter] = num
			if res, ok := solve(idx+1, used, mapping); ok {
				return res, true
			}
			used[num] = false
			delete(mapping, currentLetter)
		}
		return nil, false
	}

	used := make(map[int]bool)
	mapping := make(map[rune]int)
	if result, ok := solve(0, used, mapping); ok {
		return result, nil
	}
	return nil, errors.New("no solution found")
}

func isValidSolution(words []string, mapping map[rune]int) bool {
	sum := 0
	for i := 0; i < len(words)-1; i++ {
		sum += wordToNumber(words[i], mapping)
	}
	return sum == wordToNumber(words[len(words)-1], mapping)
}

func wordToNumber(word string, mapping map[rune]int) int {
	num := 0
	for _, char := range word {
		num = num*10 + mapping[char]
	}
	return num
}