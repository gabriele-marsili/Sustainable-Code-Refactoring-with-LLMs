package alphametics

import (
	"fmt"
	"strconv"
	"strings"
)

func Solve(puzzle string) (map[string]int, error) {
	parts := strings.Split(puzzle, " == ")
	if len(parts) != 2 {
		return nil, fmt.Errorf("invalid puzzle format")
	}

	left := strings.Split(parts[0], " + ")
	right := parts[1]

	var letters []string
	letterMap := make(map[string]bool)

	for _, word := range left {
		for _, char := range word {
			s := string(char)
			if _, ok := letterMap[s]; !ok {
				letters = append(letters, s)
				letterMap[s] = true
			}
		}
	}

	for _, char := range right {
		s := string(char)
		if _, ok := letterMap[s]; !ok {
			letters = append(letters, s)
			letterMap[s] = true
		}
	}

	if len(letters) > 10 {
		return nil, fmt.Errorf("too many letters")
	}

	result := make(map[string]int)
	digits := make([]int, len(letters))
	for i := range digits {
		digits[i] = i
	}

	var permute func(int) bool
	permute = func(k int) bool {
		if k == len(letters) {
			assignment := make(map[string]int)
			for i, letter := range letters {
				assignment[letter] = digits[i]
			}

			sum := 0
			for _, word := range left {
				num, err := convert(word, assignment)
				if err != nil {
					return false
				}
				sum += num
			}

			rightNum, err := convert(right, assignment)
			if err != nil {
				return false
			}

			if sum == rightNum {
				// Check for leading zeros
				for _, word := range append(left, right) {
					if len(word) > 1 && assignment[string(word[0])] == 0 {
						return false
					}
				}

				for letter, digit := range assignment {
					result[letter] = digit
				}
				return true
			}
			return false
		}

		for i := k; i < len(letters); i++ {
			digits[k], digits[i] = digits[i], digits[k]
			if permute(k + 1) {
				return true
			}
			digits[k], digits[i] = digits[i], digits[k] // backtrack
		}
		return false
	}

	if !permute(0) {
		return nil, fmt.Errorf("no solution found")
	}

	return result, nil
}

func convert(word string, assignment map[string]int) (int, error) {
	numStr := ""
	for _, char := range word {
		digit := assignment[string(char)]
		numStr += strconv.Itoa(digit)
	}

	num, err := strconv.Atoi(numStr)
	if err != nil {
		return 0, err // Should not happen
	}
	return num, nil
}