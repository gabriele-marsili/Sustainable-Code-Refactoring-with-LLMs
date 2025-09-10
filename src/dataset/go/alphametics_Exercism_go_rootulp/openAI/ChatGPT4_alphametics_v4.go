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

func Solve(puzzle string) (map[string]int, error) {
	eq := parse(puzzle)
	result := solvePuzzle(eq)

	if result == nil {
		return nil, errors.New("no possible solution")
	}

	return result, nil
}

func parse(puzzle string) equation {
	letterSet := make(map[rune]struct{})
	leftHandSide := []addend{}
	var rightHandSide addend
	isRightHandSide := false

	for _, item := range strings.Fields(puzzle) {
		switch item {
		case "==":
			isRightHandSide = true
		case "+":
			continue
		default:
			add := addend{letters: []rune(item)}
			if isRightHandSide {
				rightHandSide = add
			} else {
				leftHandSide = append(leftHandSide, add)
			}
			for _, letter := range item {
				letterSet[letter] = struct{}{}
			}
		}
	}

	usedLetters := make([]rune, 0, len(letterSet))
	for letter := range letterSet {
		usedLetters = append(usedLetters, letter)
	}
	sort.Slice(usedLetters, func(i, j int) bool { return usedLetters[i] < usedLetters[j] })

	return equation{usedLetters: usedLetters, leftHandSide: leftHandSide, rightHandSide: rightHandSide}
}

func solvePuzzle(eq equation) map[string]int {
	usedNumbers := make([]int, len(eq.usedLetters))
	if backtrack(0, eq, usedNumbers) {
		result := make(map[string]int, len(eq.usedLetters))
		for i, letter := range eq.usedLetters {
			result[string(letter)] = usedNumbers[i]
		}
		return result
	}
	return nil
}

func backtrack(pos int, eq equation, usedNumbers []int) bool {
	if pos == len(eq.usedLetters) {
		return isEquationTrue(eq, usedNumbers)
	}

	for num := 0; num < 10; num++ {
		if isNumberAvailable(usedNumbers[:pos], num) {
			usedNumbers[pos] = num
			if backtrack(pos+1, eq, usedNumbers) {
				return true
			}
		}
	}
	return false
}

func isEquationTrue(eq equation, usedNumbers []int) bool {
	lhsSum := 0
	for _, add := range eq.leftHandSide {
		sum, valid := calculateSum(add, eq.usedLetters, usedNumbers)
		if !valid {
			return false
		}
		lhsSum += sum
	}

	rhsSum, valid := calculateSum(eq.rightHandSide, eq.usedLetters, usedNumbers)
	return valid && lhsSum == rhsSum
}

func isNumberAvailable(usedNumbers []int, num int) bool {
	for _, used := range usedNumbers {
		if used == num {
			return false
		}
	}
	return true
}

func calculateSum(ad addend, usedLetters []rune, usedNumbers []int) (int, bool) {
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