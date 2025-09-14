package alphametics

import (
	"regexp"
	"strconv"
	"strings"
)

func Solve(puzzle string) (map[string]int, error) {
	re := regexp.MustCompile(`[A-Z]+`)
	words := re.FindAllString(puzzle, -1)
	
	if len(words) < 2 {
		return nil, nil
	}
	
	result := words[len(words)-1]
	operands := words[:len(words)-1]
	
	letterSet := make(map[rune]bool)
	for _, word := range words {
		for _, char := range word {
			letterSet[char] = true
		}
	}
	
	letters := make([]rune, 0, len(letterSet))
	for letter := range letterSet {
		letters = append(letters, letter)
	}
	
	firstLetters := make(map[rune]bool)
	for _, word := range words {
		if len(word) > 1 {
			firstLetters[rune(word[0])] = true
		}
	}
	
	assignment := make(map[rune]int)
	used := make([]bool, 10)
	
	if backtrack(letters, 0, assignment, used, operands, result, firstLetters) {
		solution := make(map[string]int, len(letters))
		for letter, digit := range assignment {
			solution[string(letter)] = digit
		}
		return solution, nil
	}
	
	return nil, nil
}

func backtrack(letters []rune, index int, assignment map[rune]int, used []bool, operands []string, result string, firstLetters map[rune]bool) bool {
	if index == len(letters) {
		return isValidSolution(assignment, operands, result)
	}
	
	letter := letters[index]
	start := 0
	if firstLetters[letter] {
		start = 1
	}
	
	for digit := start; digit <= 9; digit++ {
		if !used[digit] {
			assignment[letter] = digit
			used[digit] = true
			
			if backtrack(letters, index+1, assignment, used, operands, result, firstLetters) {
				return true
			}
			
			delete(assignment, letter)
			used[digit] = false
		}
	}
	
	return false
}

func isValidSolution(assignment map[rune]int, operands []string, result string) bool {
	sum := 0
	for _, operand := range operands {
		value := wordToNumber(operand, assignment)
		sum += value
	}
	
	resultValue := wordToNumber(result, assignment)
	return sum == resultValue
}

func wordToNumber(word string, assignment map[rune]int) int {
	var sb strings.Builder
	sb.Grow(len(word))
	
	for _, char := range word {
		sb.WriteString(strconv.Itoa(assignment[char]))
	}
	
	num, _ := strconv.Atoi(sb.String())
	return num
}