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
	letterIndex   map[rune]int // Map letter to its index in usedLetters
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
	usedLettersMap := make(map[rune]bool)
	var usedLetters []rune
	isRightHandSide := false

	for _, item := range strings.Fields(puzzle) {
		if item == "==" {
			isRightHandSide = true
			continue
		} else if item == "+" {
			continue
		} else if isRightHandSide {
			rightHandSide = addend{letters: []rune(item)}
		} else {
			leftHandSide = append(leftHandSide, addend{letters: []rune(item)})
		}

		for _, letter := range item {
			if !usedLettersMap[letter] {
				usedLettersMap[letter] = true
				usedLetters = append(usedLetters, letter)
			}
		}
	}

	letterIndex := make(map[rune]int, len(usedLetters))
	for i, letter := range usedLetters {
		letterIndex[letter] = i
	}

	return equation{
		usedLetters:   usedLetters,
		leftHandSide:  leftHandSide,
		rightHandSide: rightHandSide,
		letterIndex:   letterIndex,
	}
}

func solvePuzzle(eq equation) map[string]int {
	result := map[string]int{}
	solution := solveEquation(eq, make([]int, len(eq.usedLetters)), 0, 0)

	if solution != nil {
		for i, letter := range eq.usedLetters {
			result[string(letter)] = solution[i]
		}
		return result
	}

	return nil
}

func solveEquation(eq equation, assignment []int, index int, usedNumbersBitmask int) []int {
	if index == len(eq.usedLetters) {
		if isEquationTrue(eq, assignment) {
			return assignment
		}
		return nil
	}

	for digit := 0; digit < 10; digit++ {
		if (usedNumbersBitmask & (1 << digit)) == 0 {
			assignment[index] = digit
			newUsedNumbersBitmask := usedNumbersBitmask | (1 << digit)
			solution := solveEquation(eq, assignment, index+1, newUsedNumbersBitmask)
			if solution != nil {
				return solution
			}
		}
	}

	return nil
}

func isEquationTrue(eq equation, assignment []int) bool {
	lhsSum := 0
	for _, addend := range eq.leftHandSide {
		value, ok := getValue(addend, eq, assignment)
		if !ok {
			return false
		}
		lhsSum += value
	}

	rhsValue, ok := getValue(eq.rightHandSide, eq, assignment)
	if !ok {
		return false
	}

	return lhsSum == rhsValue
}

func getValue(ad addend, eq equation, assignment []int) (int, bool) {
	if len(ad.letters) > 1 && assignment[eq.letterIndex[ad.letters[0]]] == 0 {
		return 0, false // Leading zero
	}

	value := 0
	for _, letter := range ad.letters {
		value = value*10 + assignment[eq.letterIndex[letter]]
	}
	return value, true
}