package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(lines []string) ([]int, error) {
	stack := make([]int, 0, 16)
	words := make(map[string][]string)
	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) >= 3 && fields[0] == ":" && fields[len(fields)-1] == ";" {
			word := fields[1]
			if _, err := strconv.Atoi(word); err == nil {
				return nil, errors.New("Definition cannot be a number")
			}
			words[strings.ToLower(word)] = append([]string(nil), fields[2:len(fields)-1]...)
			continue
		}
		i := 0
		for i < len(fields) {
			tok := strings.ToLower(fields[i])
			if num, err := strconv.Atoi(tok); err == nil {
				stack = append(stack, num)
			} else if val, ok := words[tok]; ok {
				fields = append(fields[:i], append(val, fields[i+1:]...)...)
				continue
			} else {
				var err error
				stack, err = builtIns(tok, stack)
				if err != nil {
					return nil, err
				}
			}
			i++
		}
	}
	return stack, nil
}

func builtIns(tok string, stack []int) ([]int, error) {
	stackLen := len(stack)
	switch tok {
	case "+", "-", "*", "/":
		if stackLen < 2 {
			return nil, errors.New("Parse error")
		}
		a, b := stack[stackLen-2], stack[stackLen-1]
		stack = stack[:stackLen-2]
		switch tok {
		case "+":
			stack = append(stack, a+b)
		case "-":
			stack = append(stack, a-b)
		case "*":
			stack = append(stack, a*b)
		case "/":
			if b == 0 {
				return nil, errors.New("Divide by zero")
			}
			stack = append(stack, a/b)
		}
	case "dup":
		if stackLen < 1 {
			return nil, errors.New("Parse error")
		}
		stack = append(stack, stack[stackLen-1])
	case "drop":
		if stackLen < 1 {
			return nil, errors.New("Parse error")
		}
		stack = stack[:stackLen-1]
	case "swap":
		if stackLen < 2 {
			return nil, errors.New("Parse error")
		}
		stack[stackLen-1], stack[stackLen-2] = stack[stackLen-2], stack[stackLen-1]
	case "over":
		if stackLen < 2 {
			return nil, errors.New("Parse error")
		}
		stack = append(stack, stack[stackLen-2])
	default:
		return nil, errors.New("Unrecognized Token")
	}
	return stack, nil
}