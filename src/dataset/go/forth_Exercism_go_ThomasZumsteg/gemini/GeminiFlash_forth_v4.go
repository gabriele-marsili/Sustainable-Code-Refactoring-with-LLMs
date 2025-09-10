package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(lines []string) ([]int, error) {
	stack := make([]int, 0, 16) // Pre-allocate stack
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
	switch tok {
	case "+":
		if len(stack) < 2 {
			return nil, errors.New("Parse error")
		}
		a := stack[len(stack)-2]
		b := stack[len(stack)-1]
		stack = stack[:len(stack)-2]
		stack = append(stack, a+b)
	case "-":
		if len(stack) < 2 {
			return nil, errors.New("Parse error")
		}
		a := stack[len(stack)-2]
		b := stack[len(stack)-1]
		stack = stack[:len(stack)-2]
		stack = append(stack, a-b)
	case "*":
		if len(stack) < 2 {
			return nil, errors.New("Parse error")
		}
		a := stack[len(stack)-2]
		b := stack[len(stack)-1]
		stack = stack[:len(stack)-2]
		stack = append(stack, a*b)
	case "/":
		if len(stack) < 2 {
			return nil, errors.New("Parse error")
		}
		b := stack[len(stack)-1]
		if b == 0 {
			return nil, errors.New("Divide by zero")
		}
		a := stack[len(stack)-2]
		stack = stack[:len(stack)-2]
		stack = append(stack, a/b)
	case "dup":
		if len(stack) < 1 {
			return nil, errors.New("Parse error")
		}
		stack = append(stack, stack[len(stack)-1])
	case "drop":
		if len(stack) < 1 {
			return nil, errors.New("Parse error")
		}
		stack = stack[:len(stack)-1]
	case "swap":
		if len(stack) < 2 {
			return nil, errors.New("Parse error")
		}
		l := len(stack)
		stack[l-1], stack[l-2] = stack[l-2], stack[l-1]
	case "over":
		if len(stack) < 2 {
			return nil, errors.New("Parse error")
		}
		stack = append(stack, stack[len(stack)-2])
	default:
		return nil, errors.New("Unrcognized Token")
	}
	return stack, nil
}