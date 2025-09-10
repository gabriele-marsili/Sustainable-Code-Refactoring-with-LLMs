package wordy

import (
	"regexp"
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

var parseRegex = regexp.MustCompile(`^What is (-?\d+)((?: (?:plus|minus|multiplied by|divided by) -?\d+)+)\?$`)
var tokenizerRegex = regexp.MustCompile(` (plus|minus|multiplied by|divided by) (-?\d+)`)

func Answer(question string) (int, bool) {
	match := parseRegex.FindStringSubmatch(question)
	if len(match) != 3 {
		return 0, false
	}

	result, err := strconv.Atoi(match[1])
	if err != nil {
		return 0, false
	}

	tokens := tokenizerRegex.FindAllStringSubmatch(match[2], -1)
	for _, t := range tokens {
		op, ok := operators[t[1]]
		if !ok {
			return 0, false
		}
		n, err := strconv.Atoi(t[2])
		if err != nil {
			return 0, false
		}
		result = op(result, n)
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