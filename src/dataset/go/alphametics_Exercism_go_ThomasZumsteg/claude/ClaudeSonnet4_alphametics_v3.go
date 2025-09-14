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
	letterSet := make(map[string]struct{})
	
	for _, l := range value {
		letterSet[l] = struct{}{}
	}
	
	for i, term := range leftTerms {
		terms[i] = strings.Split(term, "")
		for _, l := range terms[i] {
			letterSet[l] = struct{}{}
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
		if digit, ok := letterMap[letter]; ok {
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
	
	for ok, letterMap := gen(); ok; ok, letterMap = gen() {
		if letterMap[value[0]] == 0 {
			continue
		}
		
		valid := true
		total := 0
		
		for _, term := range terms {
			if letterMap[term[0]] == 0 {
				valid = false
				break
			}
			result, _ := Translate(term, letterMap)
			total += result
		}
		
		if !valid {
			continue
		}
		
		compare, _ := Translate(value, letterMap)
		if compare == total {
			return letterMap, nil
		}
	}
	
	return nil, fmt.Errorf("No valid solution")
}