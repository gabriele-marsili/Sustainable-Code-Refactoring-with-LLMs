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
	questionPrefix = "What is"
	questionSuffix = "?"
)

func Answer(question string) (int, bool) {
	question = trim(question)
	if question == "" {
		return 0, false
	}

	result, err := calculate(question)
	if err != nil {
		return 0, false
	}

	return result, true
}

func calculate(question string) (int, error) {
	// Replace two-word operators with single-word equivalents
	question = strings.ReplaceAll(question, multipliedBy, multiplied)
	question = strings.ReplaceAll(question, dividedBy, divided)

	fields := strings.Fields(question)
	if len(fields) == 0 {
		return 0, fmt.Errorf("empty question")
	}

	result, err := strconv.Atoi(fields[0])
	if err != nil {
		return 0, fmt.Errorf("invalid number: %s", fields[0])
	}

	for i := 1; i < len(fields); i += 2 {
		if i+1 >= len(fields) {
			return 0, fmt.Errorf("invalid question format")
		}

		operator := fields[i]
		operandStr := fields[i+1]

		operand, err := strconv.Atoi(operandStr)
		if err != nil {
			return 0, fmt.Errorf("invalid number: %s", operandStr)
		}

		switch operator {
		case plus:
			result += operand
		case minus:
			result -= operand
		case multiplied:
			result *= operand
		case divided:
			if operand == 0 {
				return 0, fmt.Errorf("division by zero")
			}
			result /= operand
		default:
			return 0, fmt.Errorf("invalid operator: %s", operator)
		}
	}

	return result, nil
}

// trim removes the generic prefix and suffix from a question
func trim(question string) string {
	question = strings.TrimPrefix(question, questionPrefix)
	question = strings.TrimSuffix(question, questionSuffix)
	return question
}