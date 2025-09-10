package wordy

import (
	"strconv"
	"strings"
)

type operator func(a, b int) int

var operators = map[string]operator{
	"plus":          plus,
	"minus":         minus,
	"multiplied by": mult,
	"divided by":    div,
}

var validPrefix = "What is "
var validSuffix = "?"

func Answer(question string) (int, bool) {
	if !strings.HasPrefix(question, validPrefix) || !strings.HasSuffix(question, validSuffix) {
		return 0, false
	}

	trimmedQuestion := question[len(validPrefix) : len(question)-len(validSuffix)]
	parts := strings.Split(trimmedQuestion, " ")

	if len(parts) < 1 {
		return 0, false
	}

	result, err := strconv.Atoi(parts[0])
	if err != nil {
		return 0, false
	}

	if len(parts) == 1 {
		return result, true
	}

	if len(parts)%2 != 1 {
		return 0, false
	}

	for i := 1; i < len(parts); i += 2 {
		opStr := strings.Join(parts[i:i+1], " ")

		numStr := parts[i+1]

		op, ok := operators[opStr]
		if !ok {
			return 0, false
		}

		num, err := strconv.Atoi(numStr)
		if err != nil {
			return 0, false
		}

		result = op(result, num)
	}

	return result, true
}

func plus(a, b int) int {
	return a + b
}

func minus(a, b int) int {
	return a - b
}

func mult(a, b int) int {
	return a * b
}

func div(a, b int) int {
	return a / b
}