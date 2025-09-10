package alphametics

import (
	"errors"
	"strings"
	"unicode"
)

func Solve(puzzle string) (map[string]int, error) {
	words := strings.FieldsFunc(puzzle, func(r rune) bool {
		return r == '+' || r == '=' || unicode.IsSpace(r)
	})
	if len(words) < 2 {
		return nil, errors.New("invalid puzzle format")
	}

	uniqueChars := make(map[rune]struct{})
	for _, word := range words {
		for _, char := range word {
			if unicode.IsLetter(char) {
				uniqueChars[char] = struct{}{}
			}
		}
	}

	if len(uniqueChars) > 10 {
		return nil, errors.New("too many unique letters")
	}

	letters := make([]rune, 0, len(uniqueChars))
	for char := range uniqueChars {
		letters = append(letters, char)
	}

	leadingZeros := make(map[rune]bool)
	for _, word := range words {
		if len(word) > 0 {
			leadingZeros[rune(word[0])] = true
		}
	}

	permutations := generatePermutations([]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, len(letters))
	for _, perm := range permutations {
		solution := make(map[rune]int)
		for i, char := range letters {
			solution[char] = perm[i]
		}

		if isValidSolution(words, solution, leadingZeros) {
			result := make(map[string]int)
			for char, value := range solution {
				result[string(char)] = value
			}
			return result, nil
		}
	}

	return nil, errors.New("no solution found")
}

func generatePermutations(arr []int, n int) [][]int {
	if n == 0 {
		return [][]int{{}}
	}

	var result [][]int
	for i, val := range arr {
		remaining := append([]int{}, arr[:i]...)
		remaining = append(remaining, arr[i+1:]...)
		for _, perm := range generatePermutations(remaining, n-1) {
			result = append(result, append([]int{val}, perm...))
		}
	}
	return result
}

func isValidSolution(words []string, solution map[rune]int, leadingZeros map[rune]bool) bool {
	sum := 0
	for i, word := range words {
		value := 0
		for _, char := range word {
			value = value*10 + solution[char]
		}
		if leadingZeros[rune(word[0])] && solution[rune(word[0])] == 0 {
			return false
		}
		if i == len(words)-1 {
			sum -= value
		} else {
			sum += value
		}
	}
	return sum == 0
}