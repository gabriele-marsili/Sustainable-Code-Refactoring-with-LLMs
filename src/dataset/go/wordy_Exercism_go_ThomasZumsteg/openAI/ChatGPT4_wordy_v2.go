package wordy

import (
	"regexp"
	"strconv"
	"strings"
)

const num string = `-?\d+`

type operator func(a, b int) int

/*Answer calculates the answer to a math question.*/
func Answer(question string) (int, bool) {
	ops := `plus|minus|multiplied by|divided by`
	parseRegex := regexp.MustCompile(`^What is (` + num + `)((?: (?:` + ops + `) ` + num + `)+)\?$`)
	match := parseRegex.FindStringSubmatch(question)
	if len(match) != 3 {
		return 0, false
	}

	result, err := strconv.Atoi(match[1])
	if err != nil {
		return 0, false
	}

	tokenizer := regexp.MustCompile(` (plus|minus|multiplied by|divided by) (` + num + `)`)
	tokens := tokenizer.FindAllStringSubmatch(match[2], -1)
	for _, t := range tokens {
		op := operators[t[1]]
		n, err := strconv.Atoi(t[2])
		if err != nil {
			return 0, false
		}
		result = op(result, n)
	}
	return result, true
}

//operators are the valid operations
var operators = map[string]operator{
	"plus":          func(a, b int) int { return a + b },
	"minus":         func(a, b int) int { return a - b },
	"multiplied by": func(a, b int) int { return a * b },
	"divided by":    func(a, b int) int { return a / b },
}