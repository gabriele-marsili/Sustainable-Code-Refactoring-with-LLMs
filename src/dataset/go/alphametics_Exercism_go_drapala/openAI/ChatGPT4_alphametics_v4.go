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

	uniqueLetters := make(map[rune]struct{})
	for _, word := range words {
		for _, char := range word {
			if unicode.IsLetter(char) {
				uniqueLetters[char] = struct{}{}
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

	firstLetters := make(map[rune]struct{})
	for _, word := range words {
		firstLetters[rune(word[0])] = struct{}{}
	}

	var solve func(idx int, usedDigits int, mapping map[rune]int) (map[string]int, bool)
	solve = func(idx int, usedDigits int, mapping map[rune]int) (map[string]int, bool) {
		if idx == len(letters) {
			if isValidSolution(words, mapping) {
				result := make(map[string]int)
				for k, v := range mapping {
					result[string(k)] = v
				}
				return result, true
			}
			return nil, false
		}

		currentLetter := letters[idx]
		for digit := 0; digit <= 9; digit++ {
			if usedDigits&(1<<digit) != 0 || (digit == 0 && firstLetterConstraint(currentLetter, firstLetters)) {
				continue
			}

			mapping[currentLetter] = digit
			if solution, found := solve(idx+1, usedDigits|(1<<digit), mapping); found {
				return solution, true
			}
			delete(mapping, currentLetter)
		}
		return nil, false
	}

	mapping := make(map[rune]int)
	if solution, found := solve(0, 0, mapping); found {
		return solution, nil
	}
	return nil, errors.New("no solution found")
}

func isValidSolution(words []string, mapping map[rune]int) bool {
	sum := 0
	for i, word := range words {
		value := 0
		for _, char := range word {
			value = value*10 + mapping[char]
		}
		if i == len(words)-1 {
			sum -= value
		} else {
			sum += value
		}
	}
	return sum == 0
}

func firstLetterConstraint(letter rune, firstLetters map[rune]struct{}) bool {
	_, exists := firstLetters[letter]
	return exists
}