package alphametics

import (
	"fmt"
	"strings"
)

func Parse(input string) ([]string, [][]string, []string) {
	result := strings.Split(input, " == ")

	value := strings.Split(result[1], "")
	terms := [][]string{}
	letters := make(map[string]struct{})

	for _, l := range value {
		letters[l] = struct{}{}
	}
	for _, term := range strings.Split(result[0], " + ") {
		term := strings.Split(term, "")
		terms = append(terms, term)
		for _, l := range term {
			letters[l] = struct{}{}
		}
	}
	letterList := make([]string, 0, len(letters))
	for key := range letters {
		letterList = append(letterList, key)
	}
	return value, terms, letterList
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

func Combo(keys []string, values []int) func() (bool, map[string]int) {
	n := len(keys)
	permutation := make([]int, len(values))
	for i := range permutation {
		permutation[i] = i
	}

	return func() (bool, map[string]int) {
		if n > len(values) {
			return false, nil
		}

		letterMap := make(map[string]int, n)
		for i := 0; i < n; i++ {
			letterMap[keys[i]] = values[permutation[i]]
		}

		// Generate next permutation
		for i := len(permutation) - 1; i >= 0; i-- {
			if i == 0 || permutation[i] > permutation[i-1] {
				for j := len(permutation) - 1; j > i-1; j-- {
					if permutation[j] > permutation[i-1] {
						permutation[i-1], permutation[j] = permutation[j], permutation[i-1]
						break
					}
				}
				for j, k := i, len(permutation)-1; j < k; j, k = j+1, k-1 {
					permutation[j], permutation[k] = permutation[k], permutation[j]
				}
				return true, letterMap
			}
		}
		return false, nil
	}
}

func Solve(input string) (map[string]int, error) {
	value, terms, letters := Parse(input)
	gen := Combo(letters, []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9})

	for ok, letterMap := gen(); ok; ok, letterMap = gen() {
		if letterMap[value[0]] == 0 {
			continue
		}

		total := 0
		for _, term := range terms {
			if letterMap[term[0]] == 0 {
				total = -1
				break
			}
			result, err := Translate(term, letterMap)
			if err != nil {
				total = -1
				break
			}
			total += result
		}

		if total == -1 {
			continue
		}

		compare, err := Translate(value, letterMap)
		if err == nil && compare == total {
			return letterMap, nil
		}
	}
	return nil, fmt.Errorf("no valid solution")
}