package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(lines []string) ([]int, error) {
	stack := make([]int, 0, 16) // Pre-allocate stack to avoid frequent reallocations
	words := make(map[string][]string)

	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) >= 3 && fields[0] == ":" && fields[len(fields)-1] == ";" {
			word := strings.ToLower(fields[1])
			if _, err := strconv.Atoi(word); err == nil {
				return nil, errors.New("Definition cannot be a number")
			}
			words[word] = fields[2 : len(fields)-1]
			continue
		}

		for i := 0; i < len(fields); i++ {
			tok := strings.ToLower(fields[i])
			if num, err := strconv.Atoi(tok); err == nil {
				stack = append(stack, num)
			} else if val, ok := words[tok]; ok {
				// Inline the word definition directly to avoid function call overhead
				fields = append(fields[:i+1], append(val, fields[i+1:]...)...)
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
		stack[l-2] += stack[l-1]
		stack = stack[:l-1]
	case "-":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		stack[l-2] -= stack[l-1]
		stack = stack[:l-1]
	case "*":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		stack[l-2] *= stack[l-1]
		stack = stack[:l-1]
	case "/":
		if l < 2 {
			return nil, errors.New("Parse error")
		}
		if stack[l-1] == 0 {
			return nil, errors.New("Divide by zero")
		}
		stack[l-2] /= stack[l-1]
		stack = stack[:l-1]
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