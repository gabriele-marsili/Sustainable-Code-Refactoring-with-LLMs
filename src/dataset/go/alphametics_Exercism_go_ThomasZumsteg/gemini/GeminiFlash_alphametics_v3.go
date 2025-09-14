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

	value := strings.Split(parts[1], "")
	terms := [][]string{}
	letterSet := make(map[string]bool)

	for _, l := range value {
		letterSet[l] = true
	}

	termsParts := strings.Split(parts[0], " + ")
	for _, termStr := range termsParts {
		term := strings.Split(termStr, "")
		terms = append(terms, term)
		for _, l := range term {
			letterSet[l] = true
		}
	}

	letterList := make([]string, 0, len(letterSet))
	for letter := range letterSet {
		letterList = append(letterList, letter)
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
	indices := make([]int, n)
	used := make([]bool, len(values))
	result := make(map[string]int, n)
	var count int

	var generate func(int) bool
	generate = func(k int) bool {
		if k == n {
			count++
			return true
		}

		for i := 0; i < len(values); i++ {
			if !used[i] {
				indices[k] = i
				used[i] = true
				result[keys[k]] = values[i]
				if generate(k + 1) {
					return true
				}
				used[i] = false
			}
		}
		return false
	}

	return func() (bool, map[string]int) {
		if generate(0) {
			return true, copyMap(result)
		}
		return false, nil
	}
}

func copyMap(m map[string]int) map[string]int {
	newMap := make(map[string]int, len(m))
	for k, v := range m {
		newMap[k] = v
	}
	return newMap
}

func Solve(input string) (map[string]int, error) {
	value, terms, letters := Parse(input)
	if value == nil || terms == nil || letters == nil {
		return nil, fmt.Errorf("invalid input")
	}

	gen := Combo(letters, []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9})

	for ok, letterMap := gen(); ok; ok, letterMap = gen() {
		if letterMap[value[0]] == 0 {
			continue
		}

		total := 0
		valid := true
		for _, term := range terms {
			if len(term) > 0 && letterMap[term[0]] == 0 {
				valid = false
				break
			}
			num, err := Translate(term, letterMap)
			if err != nil {
				valid = false
				break
			}
			total += num
		}

		if !valid {
			continue
		}

		compare, err := Translate(value, letterMap)
		if err != nil {
			continue
		}

		if compare == total {
			return letterMap, nil
		}
	}

	return nil, fmt.Errorf("no valid solution")
}