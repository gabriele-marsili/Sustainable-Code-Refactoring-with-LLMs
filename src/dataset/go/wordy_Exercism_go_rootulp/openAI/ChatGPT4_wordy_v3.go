package wordy

import (
	"fmt"
	"strconv"
	"strings"
)

const (
	plus         = "plus"
	minus        = "minus"
	multipliedBy = "multiplied by"
	dividedBy    = "divided by"
	multiplied   = "multiplied"
	divided      = "divided"
)

func Answer(question string) (result int, ok bool) {
	question = trim(question)
	if question == "" {
		return 0, false
	}

	operands, operators, err := getTokens(question)
	if err != nil {
		return 0, false
	}

	result, err = compute(operands, operators)
	if err != nil {
		return 0, false
	}
	return result, true
}

func compute(operands []int, operators []string) (int, error) {
	if len(operators)+1 != len(operands) {
		return 0, fmt.Errorf("mismatched operators and operands")
	}

	result := operands[0]
	for i, operator := range operators {
		var err error
		result, err = execute(operator, result, operands[i+1])
		if err != nil {
			return 0, err
		}
	}
	return result, nil
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
			return 0, fmt.Errorf("division by zero")
		}
		return a / b, nil
	default:
		return 0, fmt.Errorf("invalid operator %v", operator)
	}
}

func getTokens(question string) ([]int, []string, error) {
	question = strings.ReplaceAll(question, multipliedBy, multiplied)
	question = strings.ReplaceAll(question, dividedBy, divided)

	parts := strings.Fields(question)
	operands := make([]int, 0, (len(parts)+1)/2)
	operators := make([]string, 0, len(parts)/2)

	for i, part := range parts {
		if i%2 == 0 {
			operand, err := strconv.Atoi(part)
			if err != nil {
				return nil, nil, fmt.Errorf("%v is not an operand", part)
			}
			operands = append(operands, operand)
		} else {
			if !isOperator(part) {
				return nil, nil, fmt.Errorf("%v is not an operator", part)
			}
			operators = append(operators, part)
		}
	}
	return operands, operators, nil
}

func isOperator(s string) bool {
	switch s {
	case plus, minus, multiplied, divided:
		return true
	default:
		return false
	}
}

func trim(question string) string {
	return strings.TrimSpace(strings.TrimSuffix(strings.TrimPrefix(question, "What is"), "?"))
}