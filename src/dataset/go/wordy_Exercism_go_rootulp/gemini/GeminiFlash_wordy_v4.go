package wordy

import (
	"fmt"
	"strconv"
	"strings"
)

// Operators
const (
	plus         = "plus"
	minus        = "minus"
	multipliedBy = "multiplied by"
	dividedBy    = "divided by"
	multiplied   = "multiplied"
	divided      = "divided"
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
	if len(operands) == 0 {
		return 0, fmt.Errorf("no operands provided")
	}

	result := operands[0]
	for i := 0; i < len(operators); i++ {
		if i+1 >= len(operands) {
			return 0, fmt.Errorf("uneven number of operators and operands")
		}
		var err error
		result, err = execute(operators[i], result, operands[i+1])
		if err != nil {
			return 0, err
		}
	}
	return result, nil
}

func execute(operator string, a int, b int) (int, error) {
	switch operator {
	case plus:
		return a + b, nil
	case minus:
		return a - b, nil
	case multiplied:
		return a * b, nil
	case divided:
		return a / b, nil
	default:
		return 0, fmt.Errorf("invalid operator %v", operator)
	}
}

func getTokens(question string) ([]int, []string, error) {
	s := trim(question)

	// Replace two word operators with one word equivalent so we can split on whitespace
	s = strings.ReplaceAll(s, multipliedBy, multiplied)
	s = strings.ReplaceAll(s, dividedBy, divided)

	fields := strings.Fields(s)
	operands := make([]int, 0, len(fields)/2+1)
	operators := make([]string, 0, len(fields)/2)

	for i, v := range fields {
		if i%2 == 1 {
			// Parse operator
			if !isOperator(v) {
				return nil, nil, fmt.Errorf("%v is not an operator", v)
			}
			operators = append(operators, v)
		} else {
			// Parse operand
			operand, err := strconv.Atoi(v)
			if err != nil {
				return nil, nil, fmt.Errorf("%v is not an operand", v)
			}
			operands = append(operands, operand)
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

// trim removes the generic prefix and suffix from a question
func trim(question string) string {
	question = strings.TrimPrefix(question, "What is")
	question = strings.TrimSuffix(question, "?")
	return question
}