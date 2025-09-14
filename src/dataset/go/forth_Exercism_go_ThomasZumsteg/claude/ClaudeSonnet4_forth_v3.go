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
		if line == "" {
			continue
		}
		
		fields := strings.Fields(line)
		if len(fields) >= 3 && fields[0] == ":" && fields[len(fields)-1] == ";" {
			word := strings.ToLower(fields[1])
			if _, err := strconv.Atoi(word); err == nil {
				return nil, errNumberDef
			}
			definition := make([]string, len(fields)-3)
			for i, field := range fields[2:len(fields)-1] {
				definition[i] = strings.ToLower(field)
			}
			words[word] = definition
			continue
		}
		
		tokens := make([]string, 0, len(fields)*2)
		for _, field := range fields {
			tokens = append(tokens, strings.ToLower(field))
		}
		
		var err error
		if stack, err = processTokens(tokens, words, stack); err != nil {
			return nil, err
		}
	}
	return stack, nil
}

func processTokens(tokens []string, words map[string][]string, stack []int) ([]int, error) {
	for i := 0; i < len(tokens); i++ {
		tok := tokens[i]
		if num, err := strconv.Atoi(tok); err == nil {
			stack = append(stack, num)
		} else if definition, ok := words[tok]; ok {
			newTokens := make([]string, 0, len(tokens)+len(definition)-1)
			newTokens = append(newTokens, tokens[:i]...)
			newTokens = append(newTokens, definition...)
			newTokens = append(newTokens, tokens[i+1:]...)
			tokens = newTokens
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
	case "+", "-", "*", "/":
		if l < 2 {
			return nil, errParseError
		}
		a, b := stack[l-2], stack[l-1]
		stack = stack[:l-2]
		switch tok {
		case "+":
			stack = append(stack, a+b)
		case "-":
			stack = append(stack, a-b)
		case "*":
			stack = append(stack, a*b)
		case "/":
			if b == 0 {
				return nil, errDivideByZero
			}
			stack = append(stack, a/b)
		}
	case "dup":
		if l < 1 {
			return nil, errParseError
		}
		stack = append(stack, stack[l-1])
	case "drop":
		if l < 1 {
			return nil, errParseError
		}
		stack = stack[:l-1]
	case "swap":
		if l < 2 {
			return nil, errParseError
		}
		stack[l-1], stack[l-2] = stack[l-2], stack[l-1]
	case "over":
		if l < 2 {
			return nil, errParseError
		}
		stack = append(stack, stack[l-2])
	default:
		return nil, errUnrecognized
	}
	return stack, nil
}