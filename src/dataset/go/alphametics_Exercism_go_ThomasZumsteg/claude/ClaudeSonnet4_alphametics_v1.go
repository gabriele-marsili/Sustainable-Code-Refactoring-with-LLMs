package alphametics

import (
	"fmt"
	"strings"
)

func Parse(input string) ([]string, [][]string, []string) {
	parts := strings.Split(input, " == ")
	value := strings.Split(parts[1], "")
	
	leftTerms := strings.Split(parts[0], " + ")
	terms := make([][]string, len(leftTerms))
	letters := make(map[string]struct{})
	
	for _, l := range value {
		letters[l] = struct{}{}
	}
	
	for i, term := range leftTerms {
		terms[i] = strings.Split(term, "")
		for _, l := range terms[i] {
			letters[l] = struct{}{}
		}
	}
	
	letter_list := make([]string, 0, len(letters))
	for key := range letters {
		letter_list = append(letter_list, key)
	}
	
	return value, terms, letter_list
}

func Translate(word []string, letter_map map[string]int) (int, error) {
	result := 0
	for _, letter := range word {
		if digit, ok := letter_map[letter]; ok {
			result = result*10 + digit
		} else {
			return 0, fmt.Errorf("Unmapped letter %s", letter)
		}
	}
	return result, nil
}

func Combo(keys []string, values []int) func() (bool, map[string]int) {
	indices := make([]int, len(keys))
	used := make([]bool, len(values))
	pos := 0
	
	return func() (bool, map[string]int) {
		for pos >= 0 {
			if pos == len(keys) {
				result := make(map[string]int, len(keys))
				for i, key := range keys {
					result[key] = values[indices[i]]
				}
				pos--
				return true, result
			}
			
			found := false
			for i := indices[pos]; i < len(values); i++ {
				if !used[i] {
					indices[pos] = i
					used[i] = true
					pos++
					found = true
					break
				}
			}
			
			if !found {
				if pos > 0 {
					pos--
					used[indices[pos]] = false
					indices[pos]++
				} else {
					return false, nil
				}
			} else {
				if pos < len(keys) {
					indices[pos] = 0
				}
			}
		}
		return false, nil
	}
}

func Solve(input string) (map[string]int, error) {
	value, terms, letters := Parse(input)
	gen := Combo(letters, []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9})
	
	for ok, letter_map := gen(); ok; ok, letter_map = gen() {
		// Check leading zeros
		if letter_map[value[0]] == 0 {
			continue
		}
		
		hasLeadingZero := false
		for _, term := range terms {
			if letter_map[term[0]] == 0 {
				hasLeadingZero = true
				break
			}
		}
		if hasLeadingZero {
			continue
		}
		
		total := 0
		for _, term := range terms {
			result, _ := Translate(term, letter_map)
			total += result
		}
		
		compare, _ := Translate(value, letter_map)
		if compare == total {
			return letter_map, nil
		}
	}
	
	return nil, fmt.Errorf("No valid solution")
}