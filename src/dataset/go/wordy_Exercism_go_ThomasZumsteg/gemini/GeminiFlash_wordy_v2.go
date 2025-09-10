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

/*Answer calulates the answer to a math question.*/
func Answer(question string) (int, bool) {
	question = strings.TrimPrefix(question, "What is ")
	question = strings.TrimSuffix(question, "?")
	parts := strings.Split(question, " ")

	if len(parts) < 3 {
		return 0, false
	}

	result, err := strconv.Atoi(parts[0])
	if err != nil {
		return 0, false
	}

	for i := 1; i < len(parts); i += 2 {
		opStr := strings.Join(parts[i:min(i+2, len(parts))], " ")

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

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}