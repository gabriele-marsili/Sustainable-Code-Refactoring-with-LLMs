package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(input []string) ([]int, error) {
	stack := make([]int, 0, 64) // Pre-allocate with reasonable capacity
	definitions := make(map[string][]string, 8) // Pre-allocate for custom definitions
	
	for _, line := range input {
		if line == "" {
			continue
		}
		
		tokens := strings.Fields(strings.ToUpper(line))
		if len(tokens) == 0 {
			continue
		}
		
		// Handle definitions
		if tokens[0] == ":" {
			if len(tokens) < 3 || tokens[len(tokens)-1] != ";" {
				return nil, errors.New("invalid definition")
			}
			
			name := tokens[1]
			if _, err := strconv.Atoi(name); err == nil {
				return nil, errors.New("cannot redefine numbers")
			}
			
			definitions[name] = tokens[2 : len(tokens)-1]
			continue
		}
		
		// Process tokens
		for i := 0; i < len(tokens); i++ {
			token := tokens[i]
			
			// Check if it's a number
			if num, err := strconv.Atoi(token); err == nil {
				stack = append(stack, num)
				continue
			}
			
			// Check custom definitions first
			if def, exists := definitions[token]; exists {
				// Expand definition inline
				expanded := make([]string, len(tokens)-1+len(def))
				copy(expanded, tokens[:i])
				copy(expanded[i:], def)
				copy(expanded[i+len(def):], tokens[i+1:])
				tokens = expanded
				i-- // Reprocess from current position
				continue
			}
			
			// Built-in operations
			switch token {
			case "+":
				if len(stack) < 2 {
					return nil, errors.New("insufficient operands")
				}
				b := stack[len(stack)-1]
				a := stack[len(stack)-2]
				stack = stack[:len(stack)-2]
				stack = append(stack, a+b)
				
			case "-":
				if len(stack) < 2 {
					return nil, errors.New("insufficient operands")
				}
				b := stack[len(stack)-1]
				a := stack[len(stack)-2]
				stack = stack[:len(stack)-2]
				stack = append(stack, a-b)
				
			case "*":
				if len(stack) < 2 {
					return nil, errors.New("insufficient operands")
				}
				b := stack[len(stack)-1]
				a := stack[len(stack)-2]
				stack = stack[:len(stack)-2]
				stack = append(stack, a*b)
				
			case "/":
				if len(stack) < 2 {
					return nil, errors.New("insufficient operands")
				}
				b := stack[len(stack)-1]
				if b == 0 {
					return nil, errors.New("division by zero")
				}
				a := stack[len(stack)-2]
				stack = stack[:len(stack)-2]
				stack = append(stack, a/b)
				
			case "DUP":
				if len(stack) < 1 {
					return nil, errors.New("insufficient operands")
				}
				stack = append(stack, stack[len(stack)-1])
				
			case "DROP":
				if len(stack) < 1 {
					return nil, errors.New("insufficient operands")
				}
				stack = stack[:len(stack)-1]
				
			case "SWAP":
				if len(stack) < 2 {
					return nil, errors.New("insufficient operands")
				}
				stack[len(stack)-1], stack[len(stack)-2] = stack[len(stack)-2], stack[len(stack)-1]
				
			case "OVER":
				if len(stack) < 2 {
					return nil, errors.New("insufficient operands")
				}
				stack = append(stack, stack[len(stack)-2])
				
			default:
				return nil, errors.New("unknown operation: " + token)
			}
		}
	}
	
	return stack, nil
}