package alphametics

import (
	"errors"
	"regexp"
	"strings"
)

func Solve(puzzle string) (map[string]int, error) {
	re := regexp.MustCompile(`[A-Z]+`)
	words := re.FindAllString(puzzle, -1)
	
	if len(words) < 2 {
		return nil, errors.New("invalid puzzle format")
	}
	
	operands := words[:len(words)-1]
	result := words[len(words)-1]
	
	letters := make(map[rune]bool)
	for _, word := range words {
		for _, char := range word {
			letters[char] = true
		}
	}
	
	if len(letters) > 10 {
		return nil, errors.New("too many unique letters")
	}
	
	letterSlice := make([]rune, 0, len(letters))
	for letter := range letters {
		letterSlice = append(letterSlice, letter)
	}
	
	leadingLetters := make(map[rune]bool)
	for _, word := range words {
		if len(word) > 1 {
			leadingLetters[rune(word[0])] = true
		}
	}
	
	used := make([]bool, 10)
	assignment := make(map[rune]int)
	
	var backtrack func(int) bool
	backtrack = func(index int) bool {
		if index == len(letterSlice) {
			return isValidSolution(operands, result, assignment)
		}
		
		letter := letterSlice[index]
		start := 0
		if leadingLetters[letter] {
			start = 1
		}
		
		for digit := start; digit <= 9; digit++ {
			if !used[digit] {
				used[digit] = true
				assignment[letter] = digit
				
				if backtrack(index + 1) {
					return true
				}
				
				delete(assignment, letter)
				used[digit] = false
			}
		}
		return false
	}
	
	if backtrack(0) {
		result := make(map[string]int, len(assignment))
		for letter, digit := range assignment {
			result[string(letter)] = digit
		}
		return result, nil
	}
	
	return nil, errors.New("no solution found")
}

func isValidSolution(operands []string, result string, assignment map[rune]int) bool {
	sum := 0
	for _, operand := range operands {
		value := wordToNumber(operand, assignment)
		sum += value
	}
	return sum == wordToNumber(result, assignment)
}

func wordToNumber(word string, assignment map[rune]int) int {
	value := 0
	for _, char := range word {
		value = value*10 + assignment[char]
	}
	return value
}