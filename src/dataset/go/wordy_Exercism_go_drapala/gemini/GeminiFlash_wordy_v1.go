package wordy

import (
	"fmt"
	"strconv"
	"strings"
)

// Errors
var (
	ErrOpNotSupported = fmt.Errorf("operation not supported")
)

func TrimCommand(input string) string {
	input = strings.TrimPrefix(input, "What is ")
	input = strings.TrimSuffix(input, "?")
	input = strings.ReplaceAll(input, " ", "")
	return input
}

func getDigitsAndCommands(input string) ([]int, []string) {
	digits := make([]int, 0)
	commands := make([]string, 0)

	numStart := -1
	for i, r := range input {
		if r >= '0' && r <= '9' || r == '-' {
			if numStart == -1 {
				numStart = i
			}
		} else {
			if numStart != -1 {
				numStr := input[numStart:i]
				num, _ := strconv.Atoi(numStr)
				digits = append(digits, num)
				numStart = -1

				// Extract command
				if i < len(input) {
					commandStart := i
					for j := i; j < len(input); j++ {
						if input[j] >= '0' && input[j] <= '9' || input[j] == '-' {
							commands = append(commands, input[commandStart:j])
							break
						}
						if j == len(input)-1 {
							commands = append(commands, input[commandStart:])
							break
						}
					}
				}
			}
		}
	}

	// Handle the case where the last part of the string is a number
	if numStart != -1 {
		numStr := input[numStart:]
		num, _ := strconv.Atoi(numStr)
		digits = append(digits, num)
	}

	return digits, commands
}

func calculator(digits []int, commands []string) (int, error) {
	result := 0
	if len(digits) == 0 {
		return 0, fmt.Errorf("no digits found")
	}

	result = digits[0]

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
			if digits[i+1] == 0 {
				return 0, fmt.Errorf("division by zero")
			}
			result /= digits[i+1]
		default: // Operation we don't support
			return 0, ErrOpNotSupported
		}
	}
	return result, nil
}

func justNumber(input string) (int, bool) {
	num, err := strconv.Atoi(input)
	if err != nil {
		return 0, false
	}
	return num, true
}

func continuousDigits(input string) bool {
	parts := strings.Split(input, " ")
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

	// Now - since we've handled just a number, we can assume that commands can be relied on for reliable error handling
	if len(commands) == 0 && len(digits) > 0 {
		return 0, false
	}

	calculated, err := calculator(digits, commands)

	// Handle error
	if err != nil {
		if err == ErrOpNotSupported {
			return 0, false
		}
		return 0, false
	}

	return calculated, true
}