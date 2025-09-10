package wordy

import (
	"regexp"
	"strconv"
	"strings"
)

const num string = `-?\d+`

type operator func(a, b int) int

func Answer(question string) (int, bool) {
	ops := strings.Join(getOps(), "|")
	parseRegex := regexp.MustCompile(`^What is (-?\d+)((?: (?:` + ops + `) -?\d+)+)\?$`)
	match := parseRegex.FindStringSubmatch(question)
	if len(match) != 3 {
		return 0, false
	}

	result, err := strconv.Atoi(match[1])
	if err != nil {
		return 0, false
	}

	tokens := regexp.MustCompile(` (?:` + ops + `) -?\d+`).FindAllString(match[2], -1)
	for _, t := range tokens {
		parts := strings.SplitN(t[1:], " ", 2)
		op, exists := operators[parts[0]]
		if !exists {
			return 0, false
		}
		n, err := strconv.Atoi(parts[1])
		if err != nil {
			return 0, false
		}
		result = op(result, n)
	}
	return result, true
}

func getOps() []string {
	opsList := make([]string, 0, len(operators))
	for k := range operators {
		opsList = append(opsList, k)
	}
	return opsList
}

var operators = map[string]operator{
	"plus":          func(a, b int) int { return a + b },
	"minus":         func(a, b int) int { return a - b },
	"multiplied by": func(a, b int) int { return a * b },
	"divided by":    func(a, b int) int { return a / b },
}