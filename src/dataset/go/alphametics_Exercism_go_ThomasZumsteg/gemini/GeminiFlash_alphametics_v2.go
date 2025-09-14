package alphametics

import (
	"fmt"
	"strings"
)

func Parse(input string) ([]string, [][]string, []string) {
	parts := strings.Split(input, " == ")
	if len(parts) != 2 {
		return nil, nil, nil // Or handle the error appropriately
	}

	result := strings.Split(parts[1], "")
	terms := [][]string{}
	letters := make(map[string]bool)

	for _, l := range result {
		letters[l] = true
	}

	terms_str := strings.Split(parts[0], " + ")
	for _, term_str := range terms_str {
		term := strings.Split(term_str, "")
		terms = append(terms, term)
		for _, l := range term {
			letters[l] = true
		}
	}

	letter_list := make([]string, 0, len(letters))
	for key := range letters {
		letter_list = append(letter_list, key)
	}

	return result, terms, letter_list
}

func Translate(word []string, letterMap map[string]int) (int, error) {
	result := 0
	for _, letter := range word {
		digit, ok := letterMap[letter]
		if !ok {
			return 0, fmt.Errorf("unmapped letter %s", letter)
		}
		result = result*10 + digit
	}
	return result, nil
}

func Solve(input string) (map[string]int, error) {
	value, terms, letters := Parse(input)

	if len(letters) > 10 {
		return nil, fmt.Errorf("too many letters")
	}

	possibleValues := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	letterMap := make(map[string]int)
	used := make([]bool, 10)

	var solve func(int) bool
	solve = func(index int) bool {
		if index == len(letters) {
			// Check if the solution is valid
			if letterMap[value[0]] == 0 {
				return false
			}
			for _, term := range terms {
				if letterMap[term[0]] == 0 {
					return false
				}
			}

			total := 0
			for _, term := range terms {
				result, err := Translate(term, letterMap)
				if err != nil {
					return false // Should not happen
				}
				total += result
			}

			compare, err := Translate(value, letterMap)
			if err != nil {
				return false // Should not happen
			}

			return compare == total
		}

		letter := letters[index]
		for i := 0; i < 10; i++ {
			if !used[i] {
				letterMap[letter] = possibleValues[i]
				used[i] = true
				if solve(index + 1) {
					return true
				}
				used[i] = false
				delete(letterMap, letter) // Backtrack
			}
		}
		return false
	}

	if solve(0) {
		return letterMap, nil
	}

	return nil, fmt.Errorf("no valid solution")
}