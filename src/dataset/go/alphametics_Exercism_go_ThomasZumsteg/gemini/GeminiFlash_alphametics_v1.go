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
	terms := make([][]string, 0)
	letters := make(map[string]bool)

	for _, l := range result {
		letters[l] = true
	}

	termsStrings := strings.Split(parts[0], " + ")
	for _, termStr := range termsStrings {
		term := strings.Split(termStr, "")
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

func Combo(keys []string, values []int) func() (bool, map[string]int) {
	n := len(keys)
	used := make([]bool, len(values))
	indices := make([]int, n)
	result := make(map[string]int)
	var i int

	return func() (bool, map[string]int) {
		i = 0
		for i < n {
			if indices[i] >= len(values) {
				used = make([]bool, len(values))
				indices[i] = 0
				i++
				if i < n {
					indices[i]++
				}
				continue
			}

			if used[indices[i]] {
				indices[i]++
				continue
			}

			used[indices[i]] = true
			result[keys[i]] = values[indices[i]]
			i++
		}

		if i > n {
			return false, nil
		}

		for j := 0; j < n; j++ {
			indices[j]++
		}

		validResult := make(map[string]int)
		for k, v := range result {
			validResult[k] = v
		}

		return true, validResult
	}
}

func Solve(input string) (map[string]int, error) {
	value, terms, letters := Parse(input)

	if len(letters) > 10 {
		return nil, fmt.Errorf("Too many letters")
	}

	gen := Combo(letters, []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9})

Iteration:
	for ok, letterMap := gen(); ok; ok, letterMap = gen() {
		if letterMap[value[0]] == 0 {
			continue Iteration
		}

		total := 0
		for _, term := range terms {
			if len(term) > 0 && letterMap[term[0]] == 0 {
				continue Iteration
			}
			result, err := Translate(term, letterMap)
			if err != nil {
				continue Iteration
			}
			total += result
		}

		compare, err := Translate(value, letterMap)
		if err != nil {
			continue Iteration
		}

		if compare == total {
			return letterMap, nil
		}
	}

	return nil, fmt.Errorf("No valid solution")
}