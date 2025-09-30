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
	letterToIndex map[rune]int
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
	leftHandSide := make([]addend, 0, 8)
	var rightHandSide addend
	letterSet := make(map[rune]bool, 10)
	isRightHandSide := false

	for _, item := range strings.Fields(puzzle) {
		if item == "==" {
			isRightHandSide = true
			continue
		} else if item == "+" {
			continue
		}

		letters := []rune(item)
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

	letterToIndex := make(map[rune]int, len(usedLetters))
	for i, letter := range usedLetters {
		letterToIndex[letter] = i
	}

	return equation{
		usedLetters:   usedLetters,
		leftHandSide:  leftHandSide,
		rightHandSide: rightHandSide,
		letterToIndex: letterToIndex,
	}
}

func solvePuzzle(eq equation) map[string]int {
	numLetters := len(eq.usedLetters)
	assignment := make([]int, numLetters)
	used := make([]bool, 10)
	
	if backtrack(eq, assignment, used, 0) {
		result := make(map[string]int, numLetters)
		for i, letter := range eq.usedLetters {
			result[string(letter)] = assignment[i]
		}
		return result
	}
	
	return nil
}

func backtrack(eq equation, assignment []int, used []bool, pos int) bool {
	if pos == len(eq.usedLetters) {
		return isEquationTrue(eq, assignment)
	}
	
	for digit := 0; digit < 10; digit++ {
		if used[digit] {
			continue
		}
		
		assignment[pos] = digit
		used[digit] = true
		
		if backtrack(eq, assignment, used, pos+1) {
			return true
		}
		
		used[digit] = false
	}
	
	return false
}

func isEquationTrue(eq equation, assignment []int) bool {
	lhsSum := 0
	
	for _, addend := range eq.leftHandSide {
		value := getValue(addend, eq.letterToIndex, assignment)
		if value == -1 {
			return false
		}
		lhsSum += value
	}
	
	rhs := getValue(eq.rightHandSide, eq.letterToIndex, assignment)
	if rhs == -1 {
		return false
	}
	
	return lhsSum == rhs
}

func getValue(ad addend, letterToIndex map[rune]int, assignment []int) int {
	if len(ad.letters) > 1 && assignment[letterToIndex[ad.letters[0]]] == 0 {
		return -1
	}
	
	value := 0
	multiplier := 1
	
	for i := len(ad.letters) - 1; i >= 0; i-- {
		digit := assignment[letterToIndex[ad.letters[i]]]
		value += digit * multiplier
		multiplier *= 10
	}
	
	return value
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

func getSum(ad addend, usedLetters []rune, usedNumbers []int) (bool, int) {
	var sum int
	numOfDigits := len(ad.letters)

	for i := 0; i < numOfDigits; i++ {
		num := getNumberFromUsedNumbers(ad.letters[i], usedLetters, usedNumbers)

		if num == 0 && i == 0 && numOfDigits > 1 {
			return false, -1
		}

		multiplier := 1
		for j := 0; j < numOfDigits-1-i; j++ {
			multiplier *= 10
		}
		sum += num * multiplier
	}

	return true, sum
}

func getNumberFromUsedNumbers(letter rune, usedLetters []rune, usedNumbers []int) int {
	for i := 0; i < len(usedLetters); i++ {
		if letter == usedLetters[i] {
			return usedNumbers[i]
		}
	}

	return -1
}