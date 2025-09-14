// Package alphametics provides functionality for solving alphametics puzzles.
package alphametics

import (
	"errors"
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
	eq, err := parse(puzzle)
	if err != nil {
		return nil, err
	}
	result := solvePuzzle(eq)

	if result == nil {
		return nil, errors.New("no possible solution")
	}

	return result, nil
}

func parse(puzzle string) (equation, error) {
	leftHandSide := make([]addend, 0)
	var rightHandSide addend
	usedLettersMap := make(map[rune]bool)
	var usedLetters []rune
	isRightHandSide := false

	fields := strings.Fields(puzzle)
	for _, item := range fields {
		switch item {
		case "==":
			isRightHandSide = true
			continue
		case "+":
			continue
		}

		runes := []rune(item)
		if isRightHandSide {
			rightHandSide = addend{letters: runes}
		} else {
			leftHandSide = append(leftHandSide, addend{letters: runes})
		}

		for _, letter := range runes {
			if !usedLettersMap[letter] {
				usedLettersMap[letter] = true
				usedLetters = append(usedLetters, letter)
			}
		}
	}

	if len(usedLetters) > 10 {
		return equation{}, errors.New("too many letters")
	}

	return equation{usedLetters: usedLetters, leftHandSide: leftHandSide, rightHandSide: rightHandSide}, nil
}

func solvePuzzle(eq equation) map[string]int {
	result := make(map[string]int)
	assignment := make([]int, len(eq.usedLetters))

	if solve(eq, assignment, 0, 0, result) {
		return result
	}

	return nil
}

func solve(eq equation, assignment []int, used int, index int, result map[string]int) bool {
	if index == len(eq.usedLetters) {
		if isEquationTrue(eq, assignment) {
			for i, letter := range eq.usedLetters {
				result[string(letter)] = assignment[i]
			}
			return true
		}
		return false
	}

	for digit := 0; digit < 10; digit++ {
		if (used & (1 << digit)) == 0 {
			assignment[index] = digit
			if solve(eq, assignment, used|(1<<digit), index+1, result) {
				return true
			}
		}
	}
	return false
}

func isEquationTrue(eq equation, assignment []int) bool {
	lhsSum := 0
	for _, addend := range eq.leftHandSide {
		value, ok := getSum(addend, eq.usedLetters, assignment)
		if !ok {
			return false
		}
		lhsSum += value
	}

	rhs, ok := getSum(eq.rightHandSide, eq.usedLetters, assignment)
	if !ok {
		return false
	}

	return lhsSum == rhs
}

func getSum(ad addend, usedLetters []rune, assignment []int) (int, bool) {
	sum := 0
	for i, letter := range ad.letters {
		digit := -1
		for j, usedLetter := range usedLetters {
			if letter == usedLetter {
				digit = assignment[j]
				break
			}
		}
		if digit == -1 {
			return 0, false // Should not happen, but handle it anyway
		}

		if digit == 0 && i == 0 && len(ad.letters) > 1 {
			return 0, false // leading zero
		}
		sum = sum*10 + digit
	}
	return sum, true
}