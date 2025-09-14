package alphametics

import (
	"fmt"
	"strings"
)

func Solve(puzzle string) (map[string]int, error) {
	parts := strings.Split(puzzle, " ")
	var letters []string
	letterMap := make(map[rune]bool)

	// Extract unique letters and identify the result part
	var resultPart []string
	for i, part := range parts {
		if part == "+" || part == "==" {
			continue
		}
		if i > 0 && parts[i-1] == "==" {
			resultPart = []string{part} // Handle cases where the result is multiple words
			break
		}

		for _, r := range part {
			if _, ok := letterMap[r]; !ok {
				letters = append(letters, string(r))
				letterMap[r] = true
			}
		}
	}

	if len(letters) > 10 {
		return nil, fmt.Errorf("too many letters")
	}

	firstLetters := make(map[rune]bool)
	for i, part := range parts {
		if part == "+" || part == "==" {
			continue
		}
		if i > 0 && parts[i-1] == "==" {
			break
		}
		if len(part) > 0 {
			firstLetters[rune(part[0])] = true
		}
	}
	if len(resultPart) > 0 && len(resultPart[0]) > 0 {
		firstLetters[rune(resultPart[0][0])] = true
	}

	solution := make(map[string]int)
	digits := make([]int, len(letters))
	used := make([]bool, 10)

	var solveRecursive func(int) bool
	solveRecursive = func(index int) bool {
		if index == len(letters) {
			// Evaluate the puzzle
			var operands []int
			var result int
			operandStr := ""
			resultStr := ""

			opIndex := 0
			for i, part := range parts {
				if part == "+" || part == "==" {
					if operandStr != "" {
						val := evaluate(operandStr, letters, solution)
						operands = append(operands, val)
						operandStr = ""
					}
					if part == "==" {
						if len(resultPart) > 0 {
							resultStr = resultPart[0]
							result = evaluate(resultStr, letters, solution)
						}
						break
					}
					opIndex++
				} else {
					if i > 0 && parts[i-1] == "==" {
						continue
					}
					operandStr += part
				}
			}
			if operandStr != "" {
				val := evaluate(operandStr, letters, solution)
				operands = append(operands, val)
			}

			sum := 0
			for _, operand := range operands {
				sum += operand
			}

			if sum == result {
				// Check for leading zeros
				for letter, _ := range firstLetters {
					letterStr := string(letter)
					if val, ok := solution[letterStr]; ok && val == 0 {
						return false
					}
				}
				return true
			}
			return false
		}

		for digit := 0; digit <= 9; digit++ {
			if !used[digit] {
				digits[index] = digit
				used[digit] = true
				solution[letters[index]] = digit

				if solveRecursive(index + 1) {
					return true
				}

				used[digit] = false
				delete(solution, letters[index])
			}
		}
		return false
	}

	if solveRecursive(0) {
		return solution, nil
	}

	return nil, fmt.Errorf("no solution")
}

func evaluate(word string, letters []string, solution map[string]int) int {
	value := 0
	for _, char := range word {
		for i, letter := range letters {
			if string(char) == letter {
				value = value*10 + solution[letter]
				break
			}
		}
	}
	return value
}