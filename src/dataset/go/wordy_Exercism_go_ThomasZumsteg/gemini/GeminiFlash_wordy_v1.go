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

var prefix = "What is "
var suffix = "?"

func Answer(question string) (int, bool) {
	if !strings.HasPrefix(question, prefix) || !strings.HasSuffix(question, suffix) {
		return 0, false
	}

	trimmedQuestion := question[len(prefix) : len(question)-len(suffix)]
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
		opStr := strings.Join(parts[i:i+2], " ")
		op, ok := operators[opStr]
		if !ok {
			return 0, false
		}

		if i+2 >= len(parts) {
			return 0, false
		}

		num, err := strconv.Atoi(parts[i+2])
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