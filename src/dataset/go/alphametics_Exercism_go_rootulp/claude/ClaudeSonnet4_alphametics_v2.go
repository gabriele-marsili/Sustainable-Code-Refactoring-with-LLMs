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
	letterMap     map[rune]int
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
			letterSet[letter] = true
		}
	}

	usedLetters := make([]rune, 0, len(letterSet))
	for letter := range letterSet {
		usedLetters = append(usedLetters, letter)
	}

	letterMap := make(map[rune]int, len(usedLetters))
	return equation{usedLetters: usedLetters, leftHandSide: leftHandSide, rightHandSide: rightHandSide, letterMap: letterMap}
}

func solvePuzzle(eq equation) map[string]int {
	used := make([]bool, 10)
	return backtrack(eq, 0, used)
}

func backtrack(eq equation, pos int, used []bool) map[string]int {
	if pos == len(eq.usedLetters) {
		if isEquationTrue(eq) {
			result := make(map[string]int, len(eq.usedLetters))
			for _, letter := range eq.usedLetters {
				result[string(letter)] = eq.letterMap[letter]
			}
			return result
		}
		return nil
	}

	letter := eq.usedLetters[pos]
	for digit := 0; digit < 10; digit++ {
		if used[digit] {
			continue
		}

		eq.letterMap[letter] = digit
		used[digit] = true

		if result := backtrack(eq, pos+1, used); result != nil {
			return result
		}

		used[digit] = false
	}

	return nil
}

func isEquationTrue(eq equation) bool {
	lhsSum := 0
	for _, addend := range eq.leftHandSide {
		sum, valid := getSum(addend, eq.letterMap)
		if !valid {
			return false
		}
		lhsSum += sum
	}

	rhs, valid := getSum(eq.rightHandSide, eq.letterMap)
	if !valid {
		return false
	}

	return lhsSum == rhs
}

func getSum(ad addend, letterMap map[rune]int) (int, bool) {
	if len(ad.letters) > 1 && letterMap[ad.letters[0]] == 0 {
		return 0, false // leading zero in multi-digit number
	}

	sum := 0
	multiplier := 1
	for i := len(ad.letters) - 1; i >= 0; i-- {
		sum += letterMap[ad.letters[i]] * multiplier
		multiplier *= 10
	}

	return sum, true
}