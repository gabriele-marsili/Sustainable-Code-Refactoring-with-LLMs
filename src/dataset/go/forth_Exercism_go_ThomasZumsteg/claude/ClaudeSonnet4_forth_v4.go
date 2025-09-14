package forth

import (
	"errors"
	"strconv"
	"strings"
)

var (
	errParseError     = errors.New("Parse error")
	errDivideByZero   = errors.New("Divide by zero")
	errNumberDef      = errors.New("Definition cannot be a number")
	errUnrecognized   = errors.New("Unrcognized Token")
)

func Forth(lines []string) ([]int, error) {
	stack := make([]int, 0, 64)
	words := make(map[string][]string, 16)
	
	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) >= 3 && fields[0] == ":" && fields[len(fields)-1] == ";" {
			word := strings.ToLower(fields[1])
			if _, err := strconv.Atoi(word); err == nil {
				return nil, errNumberDef
			}
			definition := make([]string, len(fields)-3)
			for i, field := range fields[2:len(fields)-1] {
				definition[i] = field
			}
			words[word] = definition
			continue
		}
		
		var err error
		if stack, err = processFields(fields, words, stack); err != nil {
			return nil, err
		}
	}
	return stack, nil
}

func processFields(fields []string, words map[string][]string, stack []int) ([]int, error) {
	for i := 0; i < len(fields); i++ {
		tok := strings.ToLower(fields[i])
		if num, err := strconv.Atoi(tok); err == nil {
			stack = append(stack, num)
		} else if val, ok := words[tok]; ok {
			newFields := make([]string, 0, len(fields)+len(val)-1)
			newFields = append(newFields, fields[:i]...)
			newFields = append(newFields, val...)
			newFields = append(newFields, fields[i+1:]...)
			fields = newFields
			i--
		} else {
			var err error
			if stack, err = builtIns(tok, stack); err != nil {
				return nil, err
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
			return nil, errParseError
		}
		stack[l-2] += stack[l-1]
		return stack[:l-1], nil
	case "-":
		if l < 2 {
			return nil, errParseError
		}
		stack[l-2] -= stack[l-1]
		return stack[:l-1], nil
	case "*":
		if l < 2 {
			return nil, errParseError
		}
		stack[l-2] *= stack[l-1]
		return stack[:l-1], nil
	case "/":
		if l < 2 {
			return nil, errParseError
		}
		if stack[l-1] == 0 {
			return nil, errDivideByZero
		}
		stack[l-2] /= stack[l-1]
		return stack[:l-1], nil
	case "dup":
		if l < 1 {
			return nil, errParseError
		}
		return append(stack, stack[l-1]), nil
	case "drop":
		if l < 1 {
			return nil, errParseError
		}
		return stack[:l-1], nil
	case "swap":
		if l < 2 {
			return nil, errParseError
		}
		stack[l-1], stack[l-2] = stack[l-2], stack[l-1]
		return stack, nil
	case "over":
		if l < 2 {
			return nil, errParseError
		}
		return append(stack, stack[l-2]), nil
	default:
		return nil, errUnrecognized
	}
}