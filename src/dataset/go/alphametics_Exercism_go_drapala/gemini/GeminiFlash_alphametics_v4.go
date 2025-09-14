package alphametics

import (
	"fmt"
	"strings"
)

func Solve(puzzle string) (map[string]int, error) {
	parts := strings.Split(puzzle, " ")
	if len(parts) < 3 {
		return nil, fmt.Errorf("invalid puzzle format")
	}

	var terms []string
	var result string
	var op string

	for i := 0; i < len(parts); i++ {
		if parts[i] == "+" || parts[i] == "==" {
			op = parts[i]
		} else if op == "" {
			terms = append(terms, parts[i])
		} else if op == "==" {
			result = parts[i]
		}
	}

	if result == "" {
		return nil, fmt.Errorf("invalid puzzle format")
	}

	uniqueChars := make(map[rune]bool)
	var charList []rune

	for _, term := range terms {
		for _, char := range term {
			if !uniqueChars[char] {
				uniqueChars[char] = true
				charList = append(charList, char)
			}
		}
	}

	for _, char := range result {
		if !uniqueChars[char] {
			uniqueChars[char] = true
			charList = append(charList, char)
		}
	}

	if len(charList) > 10 {
		return nil, fmt.Errorf("too many unique characters")
	}

	digits := make([]int, 10)
	for i := 0; i < 10; i++ {
		digits[i] = i
	}

	var solution map[string]int
	var solve func(int, map[rune]int, []int) bool

	solve = func(index int, assignment map[rune]int, remainingDigits []int) bool {
		if index == len(charList) {
			// Check if the assignment is a valid solution
			sum := 0
			for _, term := range terms {
				num := 0
				for _, char := range term {
					num = num*10 + assignment[char]
				}
				sum += num
			}

			resultNum := 0
			for _, char := range result {
				resultNum = resultNum*10 + assignment[char]
			}

			if sum == resultNum {
				// Check for leading zeros
				for _, term := range terms {
					if len(term) > 1 && assignment[rune(term[0])] == 0 {
						return false
					}
				}
				if len(result) > 1 && assignment[rune(result[0])] == 0 {
					return false
				}

				solution = make(map[string]int)
				for _, char := range charList {
					solution[string(char)] = assignment[char]
				}
				return true
			}
			return false
		}

		for i := 0; i < len(remainingDigits); i++ {
			newAssignment := make(map[rune]int)
			for k, v := range assignment {
				newAssignment[k] = v
			}
			newAssignment[charList[index]] = remainingDigits[i]

			newRemainingDigits := make([]int, 0, len(remainingDigits)-1)
			for j := 0; j < len(remainingDigits); j++ {
				if i != j {
					newRemainingDigits = append(newRemainingDigits, remainingDigits[j])
				}
			}

			if solve(index+1, newAssignment, newRemainingDigits) {
				return true
			}
		}
		return false
	}

	if solve(0, make(map[rune]int), digits) {
		return solution, nil
	}

	return nil, fmt.Errorf("no solution found")
}