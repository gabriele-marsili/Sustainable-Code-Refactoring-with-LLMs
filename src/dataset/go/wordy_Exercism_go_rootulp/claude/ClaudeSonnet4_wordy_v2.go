package wordy

import (
	"strconv"
	"strings"
)

// Operators
const plus = "plus"
const minus = "minus"
const multiplied = "multiplied"
const divided = "divided"

func Answer(question string) (result int, ok bool) {
	trimmed := strings.TrimPrefix(question, "What is")
	trimmed = strings.TrimSuffix(trimmed, "?")
	trimmed = strings.TrimSpace(trimmed)
	
	if trimmed == "" {
		return 0, false
	}

	// Replace two word operators with one word equivalent
	trimmed = strings.ReplaceAll(trimmed, "multiplied by", multiplied)
	trimmed = strings.ReplaceAll(trimmed, "divided by", divided)
	
	fields := strings.Fields(trimmed)
	if len(fields) == 0 || len(fields)%2 == 0 {
		return 0, false
	}

	// Parse first operand
	result, err := strconv.Atoi(fields[0])
	if err != nil {
		return 0, false
	}

	// Process operator-operand pairs
	for i := 1; i < len(fields); i += 2 {
		if i+1 >= len(fields) {
			return 0, false
		}
		
		operator := fields[i]
		operand, err := strconv.Atoi(fields[i+1])
		if err != nil {
			return 0, false
		}

		switch operator {
		case plus:
			result += operand
		case minus:
			result -= operand
		case multiplied:
			result *= operand
		case divided:
			result /= operand
		default:
			return 0, false
		}
	}
	
	return result, true
}