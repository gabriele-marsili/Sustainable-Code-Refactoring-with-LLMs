package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(input []string) ([]int, error) {
	stack := make([]int, 0, 64)
	definitions := make(map[string][]string, 8)
	
	for _, line := range input {
		if line == "" {
			continue
		}
		
		tokens := strings.Fields(strings.ToUpper(line))
		if len(tokens) == 0 {
			continue
		}
		
		if tokens[0] == ":" {
			if len(tokens) < 3 || tokens[len(tokens)-1] != ";" {
				return nil, errors.New("invalid definition")
			}
			
			name := tokens[1]
			if _, err := strconv.Atoi(name); err == nil {
				return nil, errors.New("cannot redefine numbers")
			}
			
			body := make([]string, len(tokens)-3)
			copy(body, tokens[2:len(tokens)-1])
			definitions[name] = body
			continue
		}
		
		var err error
		stack, err = processTokens(tokens, stack, definitions)
		if err != nil {
			return nil, err
		}
	}
	
	return stack, nil
}

func processTokens(tokens []string, stack []int, definitions map[string][]string) ([]int, error) {
	for i := 0; i < len(tokens); i++ {
		token := tokens[i]
		
		if num, err := strconv.Atoi(token); err == nil {
			stack = append(stack, num)
			continue
		}
		
		if def, exists := definitions[token]; exists {
			var err error
			stack, err = processTokens(def, stack, definitions)
			if err != nil {
				return nil, err
			}
			continue
		}
		
		var err error
		stack, err = executeOperation(token, stack)
		if err != nil {
			return nil, err
		}
	}
	
	return stack, nil
}

func executeOperation(op string, stack []int) ([]int, error) {
	switch op {
	case "+":
		if len(stack) < 2 {
			return nil, errors.New("insufficient operands")
		}
		n := len(stack)
		stack[n-2] += stack[n-1]
		return stack[:n-1], nil
		
	case "-":
		if len(stack) < 2 {
			return nil, errors.New("insufficient operands")
		}
		n := len(stack)
		stack[n-2] -= stack[n-1]
		return stack[:n-1], nil
		
	case "*":
		if len(stack) < 2 {
			return nil, errors.New("insufficient operands")
		}
		n := len(stack)
		stack[n-2] *= stack[n-1]
		return stack[:n-1], nil
		
	case "/":
		if len(stack) < 2 {
			return nil, errors.New("insufficient operands")
		}
		n := len(stack)
		if stack[n-1] == 0 {
			return nil, errors.New("division by zero")
		}
		stack[n-2] /= stack[n-1]
		return stack[:n-1], nil
		
	case "DUP":
		if len(stack) == 0 {
			return nil, errors.New("insufficient operands")
		}
		return append(stack, stack[len(stack)-1]), nil
		
	case "DROP":
		if len(stack) == 0 {
			return nil, errors.New("insufficient operands")
		}
		return stack[:len(stack)-1], nil
		
	case "SWAP":
		if len(stack) < 2 {
			return nil, errors.New("insufficient operands")
		}
		n := len(stack)
		stack[n-1], stack[n-2] = stack[n-2], stack[n-1]
		return stack, nil
		
	case "OVER":
		if len(stack) < 2 {
			return nil, errors.New("insufficient operands")
		}
		return append(stack, stack[len(stack)-2]), nil
		
	default:
		return nil, errors.New("unknown operation")
	}
}