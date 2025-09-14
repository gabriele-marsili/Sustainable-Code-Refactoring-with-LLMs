package wordy

import (
	"strconv"
	"strings"
)

// Operators
const plus = "plus"
const minus = "minus"
const multipliedBy = "multiplied by"
const dividedBy = "divided by"
const multiplied = "multiplied"
const divided = "divided"

func Answer(question string) (result int, ok bool) {
	trimmed := trim(question)
	if trimmed == "" {
		return 0, false
	}

	operands, operators, err := getTokens(trimmed)
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
		return 0, nil
	}

	result = operands[0]
	for i, operator := range operators {
		var opResult int
		switch operator {
		case plus:
			opResult = result + operands[i+1]
		case minus:
			opResult = result - operands[i+1]
		case multiplied:
			opResult = result * operands[i+1]
		case divided:
			opResult = result / operands[i+1]
		default:
			return 0, nil
		}
		result = opResult
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
		return a / b, nil
	default:
		return 0, nil
	}
}

func getTokens(s string) (operands []int, operators []string, e error) {
	// Replace two word operators with one word equivalent
	if strings.Contains(s, multipliedBy) {
		s = strings.ReplaceAll(s, multipliedBy, multiplied)
	}
	if strings.Contains(s, dividedBy) {
		s = strings.ReplaceAll(s, dividedBy, divided)
	}
	
	fields := strings.Fields(s)
	operands = make([]int, 0, (len(fields)+1)/2)
	operators = make([]string, 0, len(fields)/2)
	
	for i, v := range fields {
		if i%2 == 1 {
			// Parse operator
			if !isOperator(v) {
				return nil, nil, nil
			}
			operators = append(operators, v)
		} else {
			// Parse operand
			operand, err := strconv.Atoi(v)
			if err != nil {
				return nil, nil, nil
			}
			operands = append(operands, operand)
		}
	}
	return operands, operators, nil
}

func isOperator(s string) bool {
	return s == plus || s == minus || s == multiplied || s == divided
}

// trim removes the generic prefix and suffix from a question
func trim(question string) string {
	trimmed := strings.TrimPrefix(question, "What is")
	return strings.TrimSuffix(trimmed, "?")
}