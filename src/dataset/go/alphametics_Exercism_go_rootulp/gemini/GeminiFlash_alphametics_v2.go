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
	letterIndex   map[rune]int
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
	usedLetters := make([]rune, 0, 10)
	letterIndex := make(map[rune]int)
	isRightHandSide := false
	letterSet := make(map[rune]bool)

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
			if !letterSet[letter] {
				usedLetters = append(usedLetters, letter)
				letterSet[letter] = true
			}
		}
	}

	sort.Slice(usedLetters, func(i, j int) bool { return usedLetters[i] < usedLetters[j] })

	for i, letter := range usedLetters {
		letterIndex[letter] = i
	}

	return equation{usedLetters: usedLetters, leftHandSide: leftHandSide, rightHandSide: rightHandSide, letterIndex: letterIndex}
}

func solvePuzzle(eq equation) map[string]int {
	result := map[string]int{}
	numbers := make([]int, len(eq.usedLetters))
	used := make([]bool, 10)

	var solve func(int) bool
	solve = func(index int) bool {
		if index == len(eq.usedLetters) {
			if isEquationTrue(eq, numbers) {
				for i, letter := range eq.usedLetters {
					result[string(letter)] = numbers[i]
				}
				return true
			}
			return false
		}

		for i := 0; i < 10; i++ {
			if !used[i] {
				numbers[index] = i
				used[i] = true
				if solve(index + 1) {
					return true
				}
				used[i] = false
			}
		}
		return false
	}

	if solve(0) {
		return result
	}

	return nil
}

func isEquationTrue(eq equation, numbers []int) bool {
	lhsSum := 0
	for _, addend := range eq.leftHandSide {
		valid, sum := getSum(addend, eq.letterIndex, numbers)
		if !valid {
			return false
		}
		lhsSum += sum
	}

	valid, rhs := getSum(eq.rightHandSide, eq.letterIndex, numbers)
	if !valid {
		return false
	}

	return lhsSum == rhs
}

func getSum(ad addend, letterIndex map[rune]int, numbers []int) (bool, int) {
	sum := 0
	numOfDigits := len(ad.letters)

	if numOfDigits > 1 && numbers[letterIndex[ad.letters[0]]] == 0 {
		return false, 0
	}

	for i := 0; i < numOfDigits; i++ {
		num := numbers[letterIndex[ad.letters[i]]]
		sum += num * int(math.Pow(10, float64(numOfDigits-1-i)))
	}

	return true, sum
}