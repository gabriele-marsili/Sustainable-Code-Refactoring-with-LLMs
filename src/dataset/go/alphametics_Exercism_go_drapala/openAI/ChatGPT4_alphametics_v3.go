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

	leadingZeros := make(map[rune]bool)
	for _, word := range words {
		if len(word) > 0 {
			leadingZeros[rune(word[0])] = true
		}
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
			if usedDigits&(1<<digit) != 0 || (digit == 0 && leadingZeros[currentLetter]) {
				continue
			}

			mapping[currentLetter] = digit
			if res, ok := solve(idx+1, usedDigits|(1<<digit), mapping); ok {
				return res, true
			}
			delete(mapping, currentLetter)
		}
		return nil, false
	}

	mapping := make(map[rune]int)
	result, ok := solve(0, 0, mapping)
	if !ok {
		return nil, errors.New("no solution found")
	}
	return result, nil
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