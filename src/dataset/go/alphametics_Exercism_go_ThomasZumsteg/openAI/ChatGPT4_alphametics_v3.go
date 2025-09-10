package alphametics

import (
	"fmt"
	"strings"
)

func Parse(input string) ([]string, [][]string, []string) {
	result := strings.Split(input, " == ")
	value := strings.Split(result[1], "")
	terms := make([][]string, 0)
	letters := make(map[string]struct{})

	for _, l := range value {
		letters[l] = struct{}{}
	}
	for _, term := range strings.Split(result[0], " + ") {
		termSplit := strings.Split(term, "")
		terms = append(terms, termSplit)
		for _, l := range termSplit {
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
			return 0, fmt.Errorf("Unmapped letter %s", letter)
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
		if n > len(permutation) {
			return false, nil
		}
		letterMap := make(map[string]int, n)
		for i, key := range keys {
			letterMap[key] = values[permutation[i]]
		}
		for i := n - 1; i >= 0; i-- {
			permutation[i]++
			if permutation[i] < len(values) {
				for j := i + 1; j < n; j++ {
					permutation[j] = permutation[j-1] + 1
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
		valid := true
		for _, term := range terms {
			if letterMap[term[0]] == 0 {
				valid = false
				break
			}
			result, err := Translate(term, letterMap)
			if err != nil {
				valid = false
				break
			}
			total += result
		}
		if !valid {
			continue
		}
		compare, err := Translate(value, letterMap)
		if err == nil && compare == total {
			return letterMap, nil
		}
	}
	return nil, fmt.Errorf("No valid solution")
}