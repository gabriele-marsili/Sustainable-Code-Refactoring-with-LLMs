package alphametics

import (
	"errors"
	"regexp"
	"strconv"
	"strings"
)

func Solve(puzzle string) (map[string]int, error) {
	// Parse the puzzle
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
	
	// Try all permutations
	digits := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	assignment := make(map[rune]int)
	
	if solve(letters, digits, assignment, leadingLetters, leftTerms, result, 0) {
		solution := make(map[string]int)
		for letter, digit := range assignment {
			solution[string(letter)] = digit
		}
		return solution, nil
	}
	
	return nil, errors.New("no solution found")
}

func solve(letters []rune, availableDigits []int, assignment map[rune]int, leadingLetters map[rune]bool, leftTerms []string, result string, index int) bool {
	if index == len(letters) {
		return isValidSolution(assignment, leftTerms, result)
	}
	
	letter := letters[index]
	for i, digit := range availableDigits {
		if digit == 0 && leadingLetters[letter] {
			continue
		}
		
		assignment[letter] = digit
		
		// Remove digit from available digits
		newAvailable := make([]int, len(availableDigits)-1)
		copy(newAvailable[:i], availableDigits[:i])
		copy(newAvailable[i:], availableDigits[i+1:])
		
		if solve(letters, newAvailable, assignment, leadingLetters, leftTerms, result, index+1) {
			return true
		}
		
		delete(assignment, letter)
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