package wordy

import (
	"errors"
	"strconv"
	"strings"
)

// Errors
var (
	ErrOpNotSupported = errors.New("operation not supported")
)

func TrimCommand(input string) string {
	input = strings.TrimPrefix(input, "What is ")
	input = strings.TrimSuffix(input, "?")
	return strings.ReplaceAll(input, " ", "")
}

func getDigitsAndCommands(input string) ([]string, []string) {
	var digits, commands []string
	start := 0

	for i := 0; i < len(input); i++ {
		if input[i] < '0' || input[i] > '9' {
			if start < i {
				digits = append(digits, input[start:i])
			}
			start = i + 1
			for j := i; j < len(input) && (input[j] < '0' || input[j] > '9'); j++ {
				i = j
			}
			commands = append(commands, input[start-1:i+1])
			start = i + 1
		}
	}
	if start < len(input) {
		digits = append(digits, input[start:])
	}

	return digits, commands
}

func calculator(digits, commands []string) (int, error) {
	result, _ := strconv.Atoi(digits[0])

	for i, cmd := range commands {
		secondDigit, _ := strconv.Atoi(digits[i+1])

		switch cmd {
		case "plus":
			result += secondDigit
		case "minus":
			result -= secondDigit
		case "multipliedby":
			result *= secondDigit
		case "dividedby":
			if secondDigit == 0 {
				return 0, ErrOpNotSupported
			}
			result /= secondDigit
		default:
			return 0, ErrOpNotSupported
		}
	}
	return result, nil
}

func justNumber(input string, digits []string) bool {
	return len(digits) == 1 && input == digits[0]
}

func continuousDigits(input string) bool {
	return strings.Contains(input, "  ")
}

func Answer(question string) (int, bool) {
	output := TrimCommand(question)
	digits, commands := getDigitsAndCommands(output)

	if justNumber(output, digits) {
		digit, _ := strconv.Atoi(output)
		return digit, true
	}

	if continuousDigits(question) {
		return 0, false
	}

	if len(commands) == 0 {
		return 0, false
	}

	calculated, err := calculator(digits, commands)
	if err != nil {
		return 0, false
	}

	return calculated, true
}