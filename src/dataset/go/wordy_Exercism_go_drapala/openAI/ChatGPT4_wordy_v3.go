package wordy

import (
	"errors"
	"regexp"
	"strconv"
	"strings"
)

// Errors
var (
	ErrOpNotSupported = errors.New("operation not supported")
)

var (
	trimRegex       = regexp.MustCompile(`\bWhat is |\?`)
	digitRegex      = regexp.MustCompile(`-?\d+`)
	commandRegex    = regexp.MustCompile(`[a-z]+`)
	continuousRegex = regexp.MustCompile(`\d+ +\d+`)
)

func TrimCommand(input string) string {
	return trimRegex.ReplaceAllString(input, "")
}

func getDigitsAndCommands(input string) ([]string, []string) {
	digits := digitRegex.FindAllString(input, -1)
	commands := commandRegex.FindAllString(input, -1)
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
	return continuousRegex.MatchString(input)
}

func Answer(question string) (int, bool) {
	output := TrimCommand(question)
	digits, commands := getDigitsAndCommands(output)

	if justNumber(output, digits) {
		digit, _ := strconv.Atoi(output)
		return digit, true
	}

	if continuousDigits(question) || len(commands) == 0 {
		return 0, false
	}

	calculated, err := calculator(digits, commands)
	if err != nil {
		return 0, false
	}

	return calculated, true
}