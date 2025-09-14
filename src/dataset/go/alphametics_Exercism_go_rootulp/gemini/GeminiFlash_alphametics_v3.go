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

	sort.Slice(usedLetters, func(i, j int) bool { return usedLetters[i] < usedLetters[j] })
	return equation{usedLetters: usedLetters, leftHandSide: leftHandSide, rightHandSide: rightHandSide}
}

func solvePuzzle(eq equation) map[string]int {
	result := make(map[string]int, len(eq.usedLetters))
	solution := solveEquation(eq, make([]int, len(eq.usedLetters)), 0, 0)

	if solution {
		for i := 0; i < len(eq.usedLetters); i++ {
			result[string(eq.usedLetters[i])] = solutionNumbers[i]
		}
		return result
	}

	return nil
}

var solutionNumbers []int
var usedNumbers [10]bool

func solveEquation(eq equation, currentSolution []int, index int, usedMask int) bool {
	if index == len(eq.usedLetters) {
		if isEquationTrue(eq, currentSolution) {
			solutionNumbers = make([]int, len(currentSolution))
			copy(solutionNumbers, currentSolution)
			return true
		}
		return false
	}

	for i := 0; i < 10; i++ {
		if (usedMask & (1 << i)) == 0 {
			currentSolution[index] = i
			if solveEquation(eq, currentSolution, index+1, usedMask|(1<<i)) {
				return true
			}
		}
	}
	return false
}

func isEquationTrue(eq equation, usedNumbers []int) bool {
	lhsSum := 0
	for i := 0; i < len(eq.leftHandSide); i++ {
		lhs, ok := getSum(eq.leftHandSide[i], eq.usedLetters, usedNumbers)
		if !ok {
			return false
		}
		lhsSum += lhs
	}

	rhs, ok := getSum(eq.rightHandSide, eq.usedLetters, usedNumbers)
	if !ok {
		return false
	}

	return lhsSum == rhs
}

func getSum(ad addend, usedLetters []rune, usedNumbers []int) (int, bool) {
	sum := 0
	numOfDigits := len(ad.letters)

	for i := 0; i < numOfDigits; i++ {
		num := getNumberFromUsedNumbers(ad.letters[i], usedLetters, usedNumbers)

		if num == 0 && i == 0 && numOfDigits > 1 {
			return 0, false // leading zero in multi-digit number
		}

		sum += num * int(math.Pow(10, float64(numOfDigits-1-i)))
	}

	return sum, true
}

func getNumberFromUsedNumbers(letter rune, usedLetters []rune, usedNumbers []int) int {
	for i := 0; i < len(usedLetters); i++ {
		if letter == usedLetters[i] {
			return usedNumbers[i]
		}
	}

	return -1
}