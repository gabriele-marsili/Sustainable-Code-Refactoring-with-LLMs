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
	opsList []string
)

func init() {
	opsList = make([]string, 0, len(operatorMap))
	for k := range operatorMap {
		opsList = append(opsList, k)
	}
	ops := strings.Join(opsList, "|")
	parseRegex = regexp.MustCompile(`^What is (` + num + `)((?: (?:` + ops + `) ` + num + `)+)\?$`)
	tokenRegex = regexp.MustCompile(` (` + ops + `) (` + num + `)`)
}

func Answer(question string) (int, bool) {
	match := parseRegex.FindStringSubmatch(question)
	if len(match) != 3 {
		return 0, false
	}

	result, _ := strconv.Atoi(match[1])
	tokens := tokenRegex.FindAllStringSubmatch(match[2], -1)
	for _, t := range tokens {
		op := operatorMap[t[1]]
		n, _ := strconv.Atoi(t[2])
		result = op(result, n)
	}
	return result, true
}

func getOps() []string {
	return opsList
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