package wordy

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

// Errors
var (
	ErrOpNotSupported = fmt.Errorf("operation not supported")
)

func TrimCommand(input string) string {
	input = strings.TrimPrefix(input, "What is ")
	input = strings.TrimSuffix(input, "?")
	return strings.ReplaceAll(input, " ", "")
}

func getDigitsAndCommands(input string) ([]int, []string) {
	digits := make([]int, 0)
	commands := make([]string, 0)

	var currentNumber strings.Builder
	var currentCommand strings.Builder
	readingNumber := false

	for i, r := range input {
		if unicode.IsDigit(r) || r == '-' {
			if currentCommand.Len() > 0 {
				commands = append(commands, currentCommand.String())
				currentCommand.Reset()
			}
			currentNumber.WriteRune(r)
			readingNumber = true
		} else {
			if currentNumber.Len() > 0 {
				num, _ := strconv.Atoi(currentNumber.String())
				digits = append(digits, num)
				currentNumber.Reset()
				readingNumber = false
			}
			currentCommand.WriteRune(r)
		}
	}

	if currentNumber.Len() > 0 {
		num, _ := strconv.Atoi(currentNumber.String())
		digits = append(digits, num)
	}

	if currentCommand.Len() > 0 && len(digits) > len(commands) {
		commands = append(commands, currentCommand.String())
	}

	return digits, commands
}

func calculator(digits []int, commands []string) (int, error) {
	if len(digits) == 0 {
		return 0, fmt.Errorf("no digits provided")
	}

	result := digits[0]

	for i := 0; i < len(commands); i++ {
		if i+1 >= len(digits) {
			return 0, fmt.Errorf("not enough digits for commands")
		}

		switch commands[i] {
		case "plus":
			result += digits[i+1]
		case "minus":
			result -= digits[i+1]
		case "multipliedby":
			result *= digits[i+1]
		case "dividedby":
			result /= digits[i+1]
		default: // Operation we don't support
			return 0, ErrOpNotSupported
		}
	}
	return result, nil
}

func justNumber(input string) (int, bool) {
	num, err := strconv.Atoi(input)
	if err == nil {
		return num, true
	}
	return 0, false
}

func continuousDigits(input string) bool {
	parts := strings.Split(input, " ")
	if len(parts) < 2 {
		return false
	}
	for i := 0; i < len(parts)-1; i++ {
		if _, err1 := strconv.Atoi(parts[i]); err1 == nil {
			if _, err2 := strconv.Atoi(parts[i+1]); err2 == nil {
				return true
			}
		}
	}
	return false
}

func Answer(question string) (int, bool) {
	output := TrimCommand(question)

	// Handle just a number
	if num, ok := justNumber(output); ok {
		return num, true
	}

	// Handle continuous Digits
	if continuousDigits(question) {
		return 0, false
	}

	digits, commands := getDigitsAndCommands(output)
	if len(commands) == 0 && len(digits) > 0 {
		return digits[0], true
	}

	calculated, err := calculator(digits, commands)

	if err != nil {
		if err == ErrOpNotSupported {
			return 0, false
		}
		return 0, false
	}

	if len(commands) == 0 {
		return 0, false
	}

	return calculated, true
}