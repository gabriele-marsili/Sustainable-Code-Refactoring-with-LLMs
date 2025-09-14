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
	opsString   string
	operatorMap = map[string]operator{
		"plus":          func(a, b int) int { return a + b },
		"minus":         func(a, b int) int { return a - b },
		"multiplied by": func(a, b int) int { return a * b },
		"divided by":    func(a, b int) int { return a / b },
	}
)

func init() {
	ops := make([]string, 0, len(operatorMap))
	for k := range operatorMap {
		ops = append(ops, k)
	}
	opsString = strings.Join(ops, "|")
	
	parseRegex = regexp.MustCompile(`^What is (` + num + `)((?: (?:` + opsString + `) ` + num + `)+)\?$`)
	tokenRegex = regexp.MustCompile(` (` + opsString + `) (` + num + `)`)
}

/*Answer calulates the answer to a math question.*/
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

/*getOps gets the list of operations that are allowed.*/
func getOps() []string {
	ops := make([]string, 0, len(operatorMap))
	for k := range operatorMap {
		ops = append(ops, k)
	}
	return ops
}

//operators are the valid operations
var operators = operatorMap

//plus adds two numbers
func plus(a, b int) int {
	return a + b
}

//minus subtracts two numbers
func minus(a, b int) int {
	return a - b
}

//mult multiples two numbers
func mult(a, b int) int {
	return a * b
}

//div divides two numbers
func div(a, b int) int {
	return a / b
}