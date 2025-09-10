package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(lines []string) ([]int, error) {
	stack := make([]int, 0, 16) // Initialize with a reasonable capacity
	words := make(map[string][]string)

	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) >= 3 && fields[0] == ":" && fields[len(fields)-1] == ";" {
			word := fields[1]
			if _, err := strconv.Atoi(word); err == nil {
				return nil, errors.New("Definition cannot be a number")
			}
			definition := make([]string, len(fields)-3)
			for i := 2; i < len(fields)-1; i++ {
				definition[i-2] = fields[i]
			}

			words[strings.ToLower(word)] = definition
			continue
		}

		for i := 0; i < len(fields); i++ {
			tok := strings.ToLower(fields[i])
			if num, err := strconv.Atoi(tok); err == nil {
				stack = append(stack, num)
			} else if val, ok := words[tok]; ok {
				// Inline expansion for better performance
				newFields := make([]string, 0, len(fields)-1+len(val))
				newFields = append(newFields, fields[:i]...)
				newFields = append(newFields, val...)
				newFields = append(newFields, fields[i+1:]...)
				fields = newFields
				i-- // Re-evaluate the current position
			} else {
				var err error
				stack, err = builtIns(tok, stack)
				if err != nil {
					return nil, err
				}
			}
		}
	}
	return stack, nil
}

func builtIns(tok string, stack []int) ([]int, error) {
	l := len(stack)
	switch tok {
	case "+":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		a, b := stack[l-2], stack[l-1]
		stack = stack[:l-2]
		stack = append(stack, a+b)
	case "-":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		a, b := stack[l-2], stack[l-1]
		stack = stack[:l-2]
		stack = append(stack, a-b)
	case "*":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		a, b := stack[l-2], stack[l-1]
		stack = stack[:l-2]
		stack = append(stack, a*b)
	case "/":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		b := stack[l-1]
		if b == 0 {
			return nil, errors.New("Divide by zero")
		}
		a := stack[l-2]
		stack = stack[:l-2]
		stack = append(stack, a/b)
	case "dup":
		if l < 1 {
			return nil, errors.New("Parse error")
		}
		stack = append(stack, stack[l-1])
	case "drop":
		if l < 1 {
			return nil, errors.New("Parse error")
		}
		stack = stack[:l-1]
	case "swap":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		stack[l-1], stack[l-2] = stack[l-2], stack[l-1]
	case "over":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		stack = append(stack, stack[l-2])
	default:
		return nil, errors.New("Unrcognized Token")
	}
	return stack, nil
}