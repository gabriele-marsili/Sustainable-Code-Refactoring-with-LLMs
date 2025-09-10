package wordy

import (
	"regexp"
	"strconv"
)

const numPattern = `-?\d+`

type operator func(a, b int) int

func Answer(question string) (int, bool) {
	parseRegex := regexp.MustCompile(`^What is (` + numPattern + `)((?: (?:plus|minus|multiplied by|divided by) ` + numPattern + `)+)\?$`)
	match := parseRegex.FindStringSubmatch(question)
	if len(match) != 3 {
		return 0, false
	}

	result, err := strconv.Atoi(match[1])
	if err != nil {
		return 0, false
	}

	tokens := regexp.MustCompile(` (plus|minus|multiplied by|divided by) (` + numPattern + `)`).FindAllStringSubmatch(match[2], -1)
	for _, t := range tokens {
		op := operators[t[1]]
		n, _ := strconv.Atoi(t[2])
		result = op(result, n)
	}
	return result, true
}

var operators = map[string]operator{
	"plus":          func(a, b int) int { return a + b },
	"minus":         func(a, b int) int { return a - b },
	"multiplied by": func(a, b int) int { return a * b },
	"divided by":    func(a, b int) int { return a / b },
}