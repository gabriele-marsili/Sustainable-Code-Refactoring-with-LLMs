package alphametics

import (
	"fmt"
	"strings"
)

func Parse(input string) ([]string, [][]string, []string) {
	parts := strings.Split(input, " == ")
	if len(parts) != 2 {
		return nil, nil, nil // Handle invalid input
	}

	result := strings.Split(parts[1], "")
	terms := [][]string{}
	letters := make(map[string]bool)

	for _, l := range result {
		letters[l] = true
	}

	termsParts := strings.Split(parts[0], " + ")
	for _, termPart := range termsParts {
		term := strings.Split(termPart, "")
		terms = append(terms, term)
		for _, l := range term {
			letters[l] = true
		}
	}

	letterList := make([]string, 0, len(letters))
	for letter := range letters {
		letterList = append(letterList, letter)
	}

	return result, terms, letterList
}

func Translate(word []string, letterMap map[string]int) (int, error) {
	result := 0
	for _, letter := range word {
		digit, ok := letterMap[letter]
		if !ok {
			return 0, fmt.Errorf("Unmapped letter %s", letter)
		}
		result = result*10 + digit
	}
	return result, nil
}

func Solve(input string) (map[string]int, error) {
	value, terms, letters := Parse(input)
	if value == nil || terms == nil || letters == nil {
		return nil, fmt.Errorf("Invalid input format")
	}

	letterCount := len(letters)
	if letterCount > 10 {
		return nil, fmt.Errorf("Too many letters")
	}

	digits := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	possibleAssignments := make([]int, letterCount)
	used := make([]bool, 10)
	result := make(map[string]int)

	var solve func(int) bool
	solve = func(index int) bool {
		if index == letterCount {
			// Check leading zeros
			if val, ok := result[value[0]]; ok && val == 0 {
				return false
			}
			for _, term := range terms {
				if len(term) > 0 {
					if val, ok := result[term[0]]; ok && val == 0 {
						return false
					}
				}
			}

			total := 0
			for _, term := range terms {
				termValue, err := Translate(term, result)
				if err != nil {
					return false // Should not happen
				}
				total += termValue
			}

			compare, err := Translate(value, result)
			if err != nil {
				return false // Should not happen
			}

			return compare == total
		}

		for i := 0; i < 10; i++ {
			if !used[i] {
				possibleAssignments[index] = i
				used[i] = true
				result[letters[index]] = i

				if solve(index + 1) {
					return true
				}

				used[i] = false
				delete(result, letters[index])
			}
		}

		return false
	}

	if solve(0) {
		return result, nil
	}

	return nil, fmt.Errorf("No valid solution")
}