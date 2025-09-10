package wordy

import (
	"regexp"
	"strconv"
	"strings"
)

const num string = `-?\d+`

type operator func(a, b int) int

var (
	operators = map[string]operator{
		"plus":          func(a, b int) int { return a + b },
		"minus":         func(a, b int) int { return a - b },
		"multiplied by": func(a, b int) int { return a * b },
		"divided by":    func(a, b int) int { return a / b },
	}
	opsRegex = strings.Join(func() []string {
		opsList := make([]string, 0, len(operators))
		for k := range operators {
			opsList = append(opsList, k)
		}
		return opsList
	}(), "|")
	parseRegex = regexp.MustCompile(`^What is (` + num + `)((?: (?:` + opsRegex + `) ` + num + `)+)\?$`)
	tokenizer  = regexp.MustCompile(` (?:` + opsRegex + `) ` + num)
)

/*Answer calculates the answer to a math question.*/
func Answer(question string) (int, bool) {
	match := parseRegex.FindStringSubmatch(question)
	if len(match) != 3 {
		return 0, false
	}

	result, _ := strconv.Atoi(match[1])
	tokens := tokenizer.FindAllString(match[2], -1)
	for _, t := range tokens {
		parts := strings.SplitN(t[1:], " ", 2)
		op, n := operators[parts[0]], parts[1]
		num, _ := strconv.Atoi(n)
		result = op(result, num)
	}
	return result, true
}