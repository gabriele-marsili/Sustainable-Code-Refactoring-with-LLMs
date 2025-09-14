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
	letters := make(map[string]bool)
	
	for _, l := range value {
		letters[l] = true
	}
	
	for i, term := range leftTerms {
		terms[i] = strings.Split(term, "")
		for _, l := range terms[i] {
			letters[l] = true
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
		if digit, ok := letterMap[letter]; ok {
			result = result*10 + digit
		} else {
			return 0, fmt.Errorf("Unmapped letter %s", letter)
		}
	}
	return result, nil
}

func generatePermutations(letters []string, digits []int, current map[string]int, used []bool, index int, callback func(map[string]int) bool) bool {
	if index == len(letters) {
		return callback(current)
	}
	
	for i, digit := range digits {
		if used[i] {
			continue
		}
		
		current[letters[index]] = digit
		used[i] = true
		
		if generatePermutations(letters, digits, current, used, index+1, callback) {
			return true
		}
		
		used[i] = false
		delete(current, letters[index])
	}
	
	return false
}

func Solve(input string) (map[string]int, error) {
	value, terms, letters := Parse(input)
	digits := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	
	var solution map[string]int
	found := false
	
	generatePermutations(letters, digits, make(map[string]int), make([]bool, 10), 0, func(letterMap map[string]int) bool {
		// Check for leading zeros
		if letterMap[value[0]] == 0 {
			return false
		}
		
		for _, term := range terms {
			if letterMap[term[0]] == 0 {
				return false
			}
		}
		
		// Calculate sum
		total := 0
		for _, term := range terms {
			result, _ := Translate(term, letterMap)
			total += result
		}
		
		compare, _ := Translate(value, letterMap)
		if compare == total {
			solution = make(map[string]int)
			for k, v := range letterMap {
				solution[k] = v
			}
			found = true
			return true
		}
		
		return false
	})
	
	if found {
		return solution, nil
	}
	
	return nil, fmt.Errorf("No valid solution")
}

func Combo(keys []string, values []int) func() (bool, map[string]int) {
	key := keys[0]
	v := 0
	if len(keys) == 1 {
		return func() (bool, map[string]int) {
			v += 1
			if v <= len(values) {
				return true, map[string]int{key: values[v-1]}
			}
			return false, nil
		}
	} else {
		new_values := []int{}
		for i, val := range values {
			if i != v {
				new_values = append(new_values, val)
			}
		}
		gen := Combo(keys[1:], new_values)
		return func() (bool, map[string]int) {
			for true {
				if ok, combo := gen(); ok {
					combo[key] = values[v]
					return true, combo
				}
				v += 1
				if len(values) <= v {
					break
				}
				new_values = []int{}
				for i, val := range values {
					if i != v {
						new_values = append(new_values, val)
					}
				}
				gen = Combo(keys[1:], new_values)
			}
			return false, nil
		}
	}
}