package wordy

import (
	"errors"
	"strconv"
	"strings"
)

const (
	plus         = "plus"
	minus        = "minus"
	multiplied   = "multiplied"
	divided      = "divided"
	multipliedBy = "multiplied by"
	dividedBy    = "divided by"
)

func Answer(question string) (int, bool) {
	question = strings.TrimSpace(strings.TrimSuffix(strings.TrimPrefix(question, "What is"), "?"))
	if question == "" {
		return 0, false
	}

	question = strings.ReplaceAll(question, multipliedBy, multiplied)
	question = strings.ReplaceAll(question, dividedBy, divided)

	tokens := strings.Fields(question)
	if len(tokens) == 0 {
		return 0, false
	}

	operands := make([]int, 0, len(tokens)/2+1)
	operators := make([]string, 0, len(tokens)/2)

	for i, token := range tokens {
		if i%2 == 0 {
			num, err := strconv.Atoi(token)
			if err != nil {
				return 0, false
			}
			operands = append(operands, num)
		} else {
			if !isOperator(token) {
				return 0, false
			}
			operators = append(operators, token)
		}
	}

	if len(operators)+1 != len(operands) {
		return 0, false
	}

	result := operands[0]
	for i, operator := range operators {
		var err error
		result, err = execute(operator, result, operands[i+1])
		if err != nil {
			return 0, false
		}
	}

	return result, true
}

func execute(operator string, a, b int) (int, error) {
	switch operator {
	case plus:
		return a + b, nil
	case minus:
		return a - b, nil
	case multiplied:
		return a * b, nil
	case divided:
		if b == 0 {
			return 0, errors.New("division by zero")
		}
		return a / b, nil
	default:
		return 0, errors.New("invalid operator")
	}
}

func isOperator(s string) bool {
	return s == plus || s == minus || s == multiplied || s == divided
}