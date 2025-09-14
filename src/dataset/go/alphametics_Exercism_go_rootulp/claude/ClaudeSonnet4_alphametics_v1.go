// Package alphametics provides functionality for solving alphametics puzzles.
package alphametics

import (
	"errors"
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
	letterToIndex map[rune]int
	leadingLetters map[rune]bool
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
	leftHandSide := make([]addend, 0)
	var rightHandSide addend
	letterSet := make(map[rune]bool)
	leadingLetters := make(map[rune]bool)
	isRightHandSide := false

	for _, item := range strings.Fields(puzzle) {
		if item == "==" {
			isRightHandSide = true
			continue
		} else if item == "+" {
			continue
		}

		letters := []rune(item)
		if len(letters) > 1 {
			leadingLetters[letters[0]] = true
		}

		if isRightHandSide {
			rightHandSide = addend{letters: letters}
		} else {
			leftHandSide = append(leftHandSide, addend{letters: letters})
		}

		for _, letter := range letters {
			letterSet[letter] = true
		}
	}

	usedLetters := make([]rune, 0, len(letterSet))
	for letter := range letterSet {
		usedLetters = append(usedLetters, letter)
	}
	sort.Slice(usedLetters, func(i, j int) bool { return usedLetters[i] < usedLetters[j] })

	letterToIndex := make(map[rune]int, len(usedLetters))
	for i, letter := range usedLetters {
		letterToIndex[letter] = i
	}

	return equation{
		usedLetters:    usedLetters,
		leftHandSide:   leftHandSide,
		rightHandSide:  rightHandSide,
		letterToIndex:  letterToIndex,
		leadingLetters: leadingLetters,
	}
}

func solvePuzzle(eq equation) map[string]int {
	usedNumbers := make([]int, len(eq.usedLetters))
	for i := range usedNumbers {
		usedNumbers[i] = -1
	}
	used := make([]bool, 10)

	if backtrack(eq, 0, usedNumbers, used) {
		result := make(map[string]int, len(eq.usedLetters))
		for i, letter := range eq.usedLetters {
			result[string(letter)] = usedNumbers[i]
		}
		return result
	}

	return nil
}

func backtrack(eq equation, pos int, assignment []int, used []bool) bool {
	if pos == len(eq.usedLetters) {
		return isEquationTrue(eq, assignment)
	}

	letter := eq.usedLetters[pos]
	start := 0
	if eq.leadingLetters[letter] {
		start = 1
	}

	for digit := start; digit <= 9; digit++ {
		if !used[digit] {
			assignment[pos] = digit
			used[digit] = true

			if backtrack(eq, pos+1, assignment, used) {
				return true
			}

			used[digit] = false
		}
	}

	return false
}

func isEquationTrue(eq equation, usedNumbers []int) bool {
	lhsSum := 0
	for _, addend := range eq.leftHandSide {
		lhsSum += getSum(addend, eq.letterToIndex, usedNumbers)
	}

	rhs := getSum(eq.rightHandSide, eq.letterToIndex, usedNumbers)
	return lhsSum == rhs
}

func isNumberUsed(usedNumbers []int, number int) bool {
	for i := 0; i < len(usedNumbers); i++ {
		if usedNumbers[i] == number {
			return true
		}
	}

	return false
}

func isLetterUsed(usedLetters []rune, letter rune) bool {
	for i := 0; i < len(usedLetters); i++ {
		if usedLetters[i] == letter {
			return true
		}
	}

	return false
}

func getMaxNumberCanBeUsed(usedNumbers []int) int {
	for i := 9; i >= 0; i-- {
		if !isNumberUsed(usedNumbers[:len(usedNumbers)-1], i) {
			return i
		}
	}

	return 0
}

func getSum(ad addend, letterToIndex map[rune]int, usedNumbers []int) int {
	sum := 0
	multiplier := 1
	
	for i := len(ad.letters) - 1; i >= 0; i-- {
		letter := ad.letters[i]
		digit := usedNumbers[letterToIndex[letter]]
		sum += digit * multiplier
		multiplier *= 10
	}

	return sum
}

func getNumberFromUsedNumbers(letter rune, usedLetters []rune, usedNumbers []int) int {
	for i := 0; i < len(usedLetters); i++ {
		if letter == usedLetters[i] {
			return usedNumbers[i]
		}
	}

	return -1
}

func solveEquation(eq equation, usedNumbers []int) (bool, []int) {
	for i := 0; i < 10; i++ {
		if isNumberUsed(usedNumbers, i) {
			continue
		}

		usedNumbers = append(usedNumbers, i)

		if len(usedNumbers) == len(eq.usedLetters) {
			if isEquationTrue(eq, usedNumbers) {
				return true, usedNumbers
			}

			usedNumbers = usedNumbers[:len(usedNumbers)-1]
		}
	}

	return false, usedNumbers
}