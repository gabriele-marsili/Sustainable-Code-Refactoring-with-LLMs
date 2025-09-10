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
	whatIsPrefix = "What is"
	questionMark = "?"
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

func compute(operands []int, operators []string) (result int, err error) {
	if len(operands) == 1 && len(operators) == 0 {
		return operands[0], nil
	}
	if len(operators)+1 != len(operands) {
		return 0, fmt.Errorf("invalid expression: operators=%d, operands=%d", len(operators), len(operands))
	}

	result = operands[0]
	for i := 0; i < len(operators); i++ {
		result, err = execute(operators[i], result, operands[i+1])
		if err != nil {
			return 0, err
		}
	}
	return result, nil
}

func execute(operator string, a int, b int) (result int, e error) {
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
		return 0, fmt.Errorf("unknown operator: %s", operator)
	}
}

func getTokens(question string) (operands []int, operators []string, err error) {
	question = strings.ReplaceAll(question, multipliedBy, multiplied)
	question = strings.ReplaceAll(question, dividedBy, divided)

	fields := strings.Fields(question)
	operands = make([]int, 0, len(fields)/2+1)
	operators = make([]string, 0, len(fields)/2)

	for i, v := range fields {
		if i%2 == 0 {
			operand, err := strconv.Atoi(v)
			if err != nil {
				return nil, nil, fmt.Errorf("invalid number: %s", v)
			}
			operands = append(operands, operand)
		} else {
			if !isOperator(v) {
				return nil, nil, fmt.Errorf("invalid operator: %s", v)
			}
			operators = append(operators, v)
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
	question = strings.TrimPrefix(question, whatIsPrefix)
	question = strings.TrimSuffix(question, questionMark)
	return strings.TrimSpace(question)
}