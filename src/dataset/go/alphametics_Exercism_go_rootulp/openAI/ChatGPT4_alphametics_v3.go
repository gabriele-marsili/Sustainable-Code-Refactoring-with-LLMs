// Package alphametics provides functionality for solving alphametics puzzles.
package alphametics

import (
	"errors"
	"math"
	"sort"
	"strings"
)

type addend struct {
	letters []rune
}

type equation struct {
	usedLetters   []rune
	leftHandSide  []addend
	rightHandSide addend
}

// Solve solves the given input puzzle.
func Solve(puzzle string) (map[string]int, error) {
	eq := parse(puzzle)
	result := solvePuzzle(eq)

	if result == nil {
		return nil, errors.New("no possible solution")
	}

	return result, nil
}

func parse(puzzle string) equation {
	leftHandSide := []addend{}
	var rightHandSide addend
	usedLettersMap := make(map[rune]struct{})

	isRightHandSide := false
	for _, item := range strings.Fields(puzzle) {
		switch item {
		case "==":
			isRightHandSide = true
		case "+":
			continue
		default:
			if isRightHandSide {
				rightHandSide = addend{letters: []rune(item)}
			} else {
				leftHandSide = append(leftHandSide, addend{letters: []rune(item)})
			}
			for _, letter := range item {
				usedLettersMap[letter] = struct{}{}
			}
		}
	}

	usedLetters := make([]rune, 0, len(usedLettersMap))
	for letter := range usedLettersMap {
		usedLetters = append(usedLetters, letter)
	}
	sort.Slice(usedLetters, func(i, j int) bool { return usedLetters[i] < usedLetters[j] })

	return equation{usedLetters: usedLetters, leftHandSide: leftHandSide, rightHandSide: rightHandSide}
}

func solvePuzzle(eq equation) map[string]int {
	usedNumbers := make([]int, len(eq.usedLetters))
	if backtrack(eq, usedNumbers, 0) {
		result := make(map[string]int, len(eq.usedLetters))
		for i, letter := range eq.usedLetters {
			result[string(letter)] = usedNumbers[i]
		}
		return result
	}
	return nil
}

func backtrack(eq equation, usedNumbers []int, index int) bool {
	if index == len(eq.usedLetters) {
		return isEquationTrue(eq, usedNumbers)
	}

	used := make([]bool, 10)
	for _, num := range usedNumbers[:index] {
		used[num] = true
	}

	for num := 0; num < 10; num++ {
		if used[num] {
			continue
		}
		usedNumbers[index] = num
		if backtrack(eq, usedNumbers, index+1) {
			return true
		}
	}
	return false
}

func isEquationTrue(eq equation, usedNumbers []int) bool {
	lhsSum := 0
	for _, add := range eq.leftHandSide {
		sum, valid := getSum(add, eq.usedLetters, usedNumbers)
		if !valid {
			return false
		}
		lhsSum += sum
	}

	rhsSum, valid := getSum(eq.rightHandSide, eq.usedLetters, usedNumbers)
	return valid && lhsSum == rhsSum
}

func getSum(ad addend, usedLetters []rune, usedNumbers []int) (int, bool) {
	sum := 0
	for i, letter := range ad.letters {
		num := usedNumbers[indexOf(letter, usedLetters)]
		if num == 0 && i == 0 && len(ad.letters) > 1 {
			return 0, false
		}
		sum = sum*10 + num
	}
	return sum, true
}

func indexOf(letter rune, usedLetters []rune) int {
	for i, l := range usedLetters {
		if l == letter {
			return i
		}
	}
	return -1
}