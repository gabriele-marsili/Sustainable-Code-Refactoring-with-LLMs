package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(input []string) ([]int, error) {
	var stack []int
	words := make(map[string][]string)
	
	for _, line := range input {
		if line == "" {
			continue
		}
		
		tokens := strings.Fields(strings.ToLower(line))
		if len(tokens) == 0 {
			continue
		}
		
		if tokens[0] == ":" {
			if len(tokens) < 3 || tokens[len(tokens)-1] != ";" {
				return nil, errors.New("invalid word definition")
			}
			
			wordName := tokens[1]
			if _, err := strconv.Atoi(wordName); err == nil {
				return nil, errors.New("cannot redefine numbers")
			}
			
			words[wordName] = tokens[2 : len(tokens)-1]
			continue
		}
		
		var err error
		stack, err = processTokens(tokens, stack, words)
		if err != nil {
			return nil, err
		}
	}
	
	return stack, nil
}

func processTokens(tokens []string, stack []int, words map[string][]string) ([]int, error) {
	for i := 0; i < len(tokens); i++ {
		token := tokens[i]
		
		if num, err := strconv.Atoi(token); err == nil {
			stack = append(stack, num)
			continue
		}
		
		if definition, exists := words[token]; exists {
			var err error
			stack, err = processTokens(definition, stack, words)
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
		
	case "dup":
		if len(stack) == 0 {
			return nil, errors.New("insufficient operands")
		}
		return append(stack, stack[len(stack)-1]), nil
		
	case "drop":
		if len(stack) == 0 {
			return nil, errors.New("insufficient operands")
		}
		return stack[:len(stack)-1], nil
		
	case "swap":
		if len(stack) < 2 {
			return nil, errors.New("insufficient operands")
		}
		n := len(stack)
		stack[n-1], stack[n-2] = stack[n-2], stack[n-1]
		return stack, nil
		
	case "over":
		if len(stack) < 2 {
			return nil, errors.New("insufficient operands")
		}
		return append(stack, stack[len(stack)-2]), nil
		
	default:
		return nil, errors.New("unknown operation")
	}
}