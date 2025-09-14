package alphametics

import (
	"errors"
	"strings"
)

func Solve(puzzle string) (map[string]int, error) {
	parts := strings.Split(puzzle, " == ")
	if len(parts) != 2 {
		return nil, errors.New("invalid puzzle format")
	}
	
	left := strings.ReplaceAll(parts[0], " + ", " ")
	leftTerms := strings.Fields(left)
	result := parts[1]
	
	// Extract unique letters
	letterSet := make(map[rune]bool)
	allTerms := append(leftTerms, result)
	
	for _, term := range allTerms {
		for _, char := range term {
			if char >= 'A' && char <= 'Z' {
				letterSet[char] = true
			}
		}
	}
	
	if len(letterSet) > 10 {
		return nil, errors.New("too many unique letters")
	}
	
	letters := make([]rune, 0, len(letterSet))
	for letter := range letterSet {
		letters = append(letters, letter)
	}
	
	// Find leading letters (cannot be zero)
	leadingLetters := make(map[rune]bool)
	for _, term := range allTerms {
		if len(term) > 1 {
			leadingLetters[rune(term[0])] = true
		}
	}
	
	assignment := make(map[rune]int)
	used := make([]bool, 10)
	
	if backtrack(letters, 0, assignment, used, leftTerms, result, leadingLetters) {
		solution := make(map[string]int)
		for letter, digit := range assignment {
			solution[string(letter)] = digit
		}
		return solution, nil
	}
	
	return nil, errors.New("no solution found")
}

func backtrack(letters []rune, index int, assignment map[rune]int, used []bool, leftTerms []string, result string, leadingLetters map[rune]bool) bool {
	if index == len(letters) {
		return isValidSolution(assignment, leftTerms, result)
	}
	
	letter := letters[index]
	start := 0
	if leadingLetters[letter] {
		start = 1
	}
	
	for digit := start; digit <= 9; digit++ {
		if !used[digit] {
			assignment[letter] = digit
			used[digit] = true
			
			if backtrack(letters, index+1, assignment, used, leftTerms, result, leadingLetters) {
				return true
			}
			
			delete(assignment, letter)
			used[digit] = false
		}
	}
	
	return false
}

func isValidSolution(assignment map[rune]int, leftTerms []string, result string) bool {
	sum := 0
	for _, term := range leftTerms {
		value := 0
		for _, char := range term {
			value = value*10 + assignment[char]
		}
		sum += value
	}
	
	resultValue := 0
	for _, char := range result {
		resultValue = resultValue*10 + assignment[char]
	}
	
	return sum == resultValue
}