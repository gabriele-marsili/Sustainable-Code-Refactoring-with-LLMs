package wordy

import (
	"regexp"
	"strconv"
	"strings"
)

const num string = `-?\d+`

type operator func(a, b int) int

var (
	parseRegex  *regexp.Regexp
	tokenRegex  *regexp.Regexp
	operatorMap = map[string]operator{
		"plus":          func(a, b int) int { return a + b },
		"minus":         func(a, b int) int { return a - b },
		"multiplied by": func(a, b int) int { return a * b },
		"divided by":    func(a, b int) int { return a / b },
	}
	operatorKeys = []string{"plus", "minus", "multiplied by", "divided by"}
)

func init() {
	ops := strings.Join(operatorKeys, "|")
	parseRegex = regexp.MustCompile(`^What is (` + num + `)((?:\s(?:` + ops + `)\s` + num + `)+)\?$`)
	tokenRegex = regexp.MustCompile(`\s(` + ops + `)\s(` + num + `)`)
}

func Answer(question string) (int, bool) {
	match := parseRegex.FindStringSubmatch(question)
	if len(match) != 3 {
		return 0, false
	}

	result, err := strconv.Atoi(match[1])
	if err != nil {
		return 0, false
	}

	tokens := tokenRegex.FindAllStringSubmatch(match[2], -1)
	for _, t := range tokens {
		op, exists := operatorMap[t[1]]
		if !exists {
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

func getOps() []string {
	return operatorKeys
}

var operators = operatorMap

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