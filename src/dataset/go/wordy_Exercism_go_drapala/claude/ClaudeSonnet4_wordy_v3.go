package wordy

import (
	"fmt"
	"strconv"
	"strings"
)

var (
	ErrOpNotSupported = fmt.Errorf("operation not supported")
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
	var digits, commands []string
	var current strings.Builder
	inNumber := false
	
	for i, r := range input {
		if (r >= '0' && r <= '9') || (r == '-' && i+1 < len(input) && input[i+1] >= '0' && input[i+1] <= '9') {
			if !inNumber {
				if current.Len() > 0 {
					commands = append(commands, current.String())
					current.Reset()
				}
				inNumber = true
			}
			current.WriteRune(r)
		} else {
			if inNumber {
				digits = append(digits, current.String())
				current.Reset()
				inNumber = false
			}
			if r != ' ' {
				current.WriteRune(r)
			}
		}
	}
	
	if inNumber {
		digits = append(digits, current.String())
	} else if current.Len() > 0 {
		commands = append(commands, current.String())
	}
	
	return digits, commands
}

func calculator(digits, commands []string) (int, error) {
	if len(digits) == 0 {
		return 0, ErrOpNotSupported
	}
	
	result, err := strconv.Atoi(digits[0])
	if err != nil {
		return 0, ErrOpNotSupported
	}
	
	for i := 0; i < len(commands) && i+1 < len(digits); i++ {
		secondDigit, err := strconv.Atoi(digits[i+1])
		if err != nil {
			return 0, ErrOpNotSupported
		}
		
		switch commands[i] {
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
	spaceFound := false
	digitAfterSpace := false
	
	for _, r := range input {
		if r == ' ' {
			spaceFound = true
		} else if r >= '0' && r <= '9' {
			if spaceFound {
				digitAfterSpace = true
				break
			}
		} else if r != '-' {
			spaceFound = false
		}
	}
	
	return digitAfterSpace
}

func Answer(question string) (int, bool) {
	output := TrimCommand(question)
	digits, commands := getDigitsAndCommands(output)
	
	if justNumber(output, digits) {
		digit, err := strconv.Atoi(output)
		if err != nil {
			return 0, false
		}
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