package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(lines []string) ([]int, error) {
	stack := make([]int, 0, 64) // Pre-allocate with reasonable capacity
	words := make(map[string][]string, 16) // Pre-allocate with reasonable capacity
	
	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) >= 3 && fields[0] == ":" && fields[len(fields)-1] == ";" {
			word := strings.ToLower(fields[1])
			if _, err := strconv.Atoi(word); err == nil {
				return nil, errors.New("Definition cannot be a number")
			}
			definition := make([]string, len(fields)-3)
			for i, field := range fields[2:len(fields)-1] {
				definition[i] = strings.ToLower(field)
			}
			words[word] = definition
			continue
		}
		
		// Convert fields to lowercase once
		for i := range fields {
			fields[i] = strings.ToLower(fields[i])
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
		tok := fields[i]
		if num, err := strconv.Atoi(tok); err == nil {
			stack = append(stack, num)
		} else if val, ok := words[tok]; ok {
			// Expand word definition in place
			newFields := make([]string, 0, len(fields)+len(val)-1)
			newFields = append(newFields, fields[:i]...)
			newFields = append(newFields, val...)
			newFields = append(newFields, fields[i+1:]...)
			fields = newFields
			i-- // Reprocess current position
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
			return nil, errors.New("Parse error")
		}
		b, a := stack[l-1], stack[l-2]
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
				return nil, errors.New("Divide by zero")
			}
			stack = append(stack, a/b)
		}
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