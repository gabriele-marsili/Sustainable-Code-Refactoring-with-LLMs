package alphametics

import (
	"fmt"
	"strconv"
	"strings"
)

func Solve(puzzle string) (map[string]int, error) {
	words := strings.Split(puzzle, " ")
	var letters []string
	letterMap := make(map[string]bool)
	var addends []string
	var result string

	for i, word := range words {
		if word == "+" {
			continue
		}
		if word == "==" {
			result = words[i+1]
			break
		}
		addends = append(addends, word)
		for _, char := range word {
			letter := string(char)
			if _, ok := letterMap[letter]; !ok {
				letters = append(letters, letter)
				letterMap[letter] = true
			}
		}
	}

	for _, char := range result {
		letter := string(char)
		if _, ok := letterMap[letter]; !ok {
			letters = append(letters, letter)
			letterMap[letter] = true
		}
	}

	if len(letters) > 10 {
		return nil, fmt.Errorf("too many letters")
	}

	solution := make(map[string]int)
	digits := make([]int, 10)
	for i := 0; i < 10; i++ {
		digits[i] = i
	}

	var solve func(int) bool
	solve = func(index int) bool {
		if index == len(letters) {
			// Check if the solution is valid
			for i, letter := range letters {
				solution[letter] = digits[i]
			}

			// Check for leading zeros
			for _, word := range append(addends, result) {
				if solution[string(word[0])] == 0 && len(word) > 1 {
					return false
				}
			}

			// Evaluate the expression
			sum := 0
			for _, word := range addends {
				num, _ := stringToInt(word, solution)
				sum += num
			}

			resultNum, _ := stringToInt(result, solution)
			return sum == resultNum
		}

		for i := index; i < 10; i++ {
			digits[index], digits[i] = digits[i], digits[index]
			if solve(index + 1) {
				return true
			}
			digits[index], digits[i] = digits[i], digits[index] // Backtrack
		}

		return false
	}

	if solve(0) {
		return solution, nil
	}

	return nil, fmt.Errorf("no solution found")
}

func stringToInt(s string, solution map[string]int) (int, error) {
	numStr := ""
	for _, char := range s {
		numStr += strconv.Itoa(solution[string(char)])
	}
	num, err := strconv.Atoi(numStr)
	if err != nil {
		return 0, err
	}
	return num, nil
}