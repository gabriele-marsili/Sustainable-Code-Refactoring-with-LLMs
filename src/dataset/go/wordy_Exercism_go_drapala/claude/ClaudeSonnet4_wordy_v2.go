package wordy

import (
	"fmt"
	"strconv"
	"strings"
)

// Errors
var (
    ErrOpNotSupported  = fmt.Errorf("operation not supported")
)

func TrimCommand(input string) string {
	if strings.HasPrefix(input, "What is ") {
		input = input[8:]
	}
	if strings.HasSuffix(input, "?") {
		input = input[:len(input)-1]
	}
	return strings.ReplaceAll(input, " ", "")
}

func getDigitsAndCommands(input string) ([]string, []string) {
	digits := make([]string, 0, 8)
	commands := make([]string, 0, 8)
	
	i := 0
	for i < len(input) {
		// Skip non-digit, non-minus characters
		for i < len(input) && input[i] != '-' && (input[i] < '0' || input[i] > '9') {
			i++
		}
		if i >= len(input) {
			break
		}
		
		// Extract number
		start := i
		if input[i] == '-' {
			i++
		}
		for i < len(input) && input[i] >= '0' && input[i] <= '9' {
			i++
		}
		digits = append(digits, input[start:i])
		
		// Extract command
		cmdStart := i
		for i < len(input) && input[i] != '-' && (input[i] < '0' || input[i] > '9') {
			i++
		}
		if i > cmdStart && len(digits) > len(commands)+1 {
			commands = append(commands, input[cmdStart:i])
		}
	}
	
	return digits, commands
}

func calculator(digits, commands []string) (int, error) {
	if len(digits) == 0 {
		return 0, ErrOpNotSupported
	}
	
	result, _ := strconv.Atoi(digits[0])
	
	for i := 0; i < len(commands) && i+1 < len(digits); i++ {
		secondDigit, _ := strconv.Atoi(digits[i+1])
		
		switch commands[i] {
		case "plus":
			result += secondDigit
		case "minus":
			result -= secondDigit
		case "multipliedby":
			result *= secondDigit
		case "dividedby":
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
	digitCount := 0
	inDigit := false
	
	for _, char := range input {
		if char >= '0' && char <= '9' {
			if !inDigit {
				digitCount++
				inDigit = true
			}
		} else if char == ' ' {
			inDigit = false
		} else if char != '-' {
			inDigit = false
		}
	}
	
	return digitCount >= 2
}

func Answer(question string) (int, bool) {
	output := TrimCommand(question)
	digits, commands := getDigitsAndCommands(output)
	
	// Handle just a number
	if justNumber(output, digits) {
		digit, _ := strconv.Atoi(output)
		return digit, true
	}
	
	// Handle continuous Digits
	if continuousDigits(question) {
		return 0, false
	}
	
	// Handle error cases
	if len(commands) == 0 || len(digits) <= len(commands) {
		return 0, false
	}
	
	calculated, err := calculator(digits, commands)
	if err != nil {
		return 0, false
	}
	
	return calculated, true
}