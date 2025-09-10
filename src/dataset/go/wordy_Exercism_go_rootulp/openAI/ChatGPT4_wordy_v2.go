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
	question = trim(question)
	if question == "" {
		return 0, false
	}

	operands, operators, err := getTokens(question)
	if err != nil {
		return 0, false
	}

	result, err := compute(operands, operators)
	if err != nil {
		return 0, false
	}
	return result, true
}

func compute(operands []int, operators []string) (int, error) {
	if len(operators)+1 != len(operands) {
		return 0, errors.New("mismatched operands and operators")
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
			return 0, errors.New("division by zero")
		}
		return a / b, nil
	default:
		return 0, errors.New("invalid operator")
	}
}

func getTokens(question string) ([]int, []string, error) {
	question = strings.ReplaceAll(question, multipliedBy, multiplied)
	question = strings.ReplaceAll(question, dividedBy, divided)

	words := strings.Fields(question)
	var operands []int
	var operators []string

	for i, word := range words {
		if i%2 == 0 {
			operand, err := strconv.Atoi(word)
			if err != nil {
				return nil, nil, errors.New("invalid operand")
			}
			operands = append(operands, operand)
		} else {
			if !isOperator(word) {
				return nil, nil, errors.New("invalid operator")
			}
			operators = append(operators, word)
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
	question = strings.TrimPrefix(question, "What is ")
	return strings.TrimSuffix(question, "?")
}