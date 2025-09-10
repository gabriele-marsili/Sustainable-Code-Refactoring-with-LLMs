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
	return strings.ReplaceAll(input, " ", "")
}

func getDigitsAndCommands(input string) ([]int, []string) {
	digits := make([]int, 0)
	commands := make([]string, 0)

	numStart := -1
	for i, r := range input {
		if (r >= '0' && r <= '9') || r == '-' {
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
					command := ""
					commandStart := i
					for j := i; j < len(input); j++ {
						if (input[j] >= '0' && input[j] <= '9') || input[j] == '-' {
							break
						}
						command += string(input[j])
						command = strings.TrimSpace(command)
					}
					commands = append(commands, command)
					i = commandStart + len(command) -1
				}
			}
		}
	}

	// Handle the last number if it exists
	if numStart != -1 {
		numStr := input[numStart:]
		num, _ := strconv.Atoi(numStr)
		digits = append(digits, num)
	}

	return digits, commands
}

func calculator(digits []int, commands []string) (int, error) {
	result := digits[0]

	for i := 0; i < len(commands); i++ {
		if i+1 >= len(digits) {
			return 0, fmt.Errorf("invalid expression")
		}
		secondDigit := digits[i+1]

		switch commands[i] {
		case "plus":
			result += secondDigit
		case "minus":
			result -= secondDigit
		case "multipliedby":
			result *= secondDigit
		case "dividedby":
			result /= secondDigit
		default: // Operation we don't support
			return 0, ErrOpNotSupported
		}
	}
	return result, nil
}

func justNumber(input string, digits []int) bool {
	if len(digits) == 0 {
		return false // Error case - handle outside
	}
	numStr := strconv.Itoa(digits[0])
	if input == numStr {
		return true // Entire input is just a number
	}
	return false
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
	digits, commands := getDigitsAndCommands(output)

	if len(digits) == 0 && len(commands) == 0 {
		return 0, false
	}

	// Handle just a number
	if len(digits) == 1 && len(commands) == 0 {
		numStr := strconv.Itoa(digits[0])
		if output == numStr {
			return digits[0], true
		}
	}

	// Handle continuous Digits
	if continuousDigits(question) {
		return 0, false
	}

	if len(digits)-1 != len(commands) {
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

	// Now - since we've handled just a number, we can assume that commands can be relied on for reliable error handling
	if len(commands) == 0 && len(digits) > 0 {
		return 0, false
	}

	return calculated, true
}