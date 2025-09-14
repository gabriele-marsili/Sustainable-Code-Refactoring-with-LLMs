package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(input []string) ([]int, error) {
	var stack []int
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
			
			body := make([]string, 0, len(tokens)-3)
			for i := 2; i < len(tokens)-1; i++ {
				if def, exists := definitions[tokens[i]]; exists {
					body = append(body, def...)
				} else {
					body = append(body, tokens[i])
				}
			}
			definitions[name] = body
			continue
		}
		
		if err := processTokens(tokens, &stack, definitions); err != nil {
			return nil, err
		}
	}
	
	return stack, nil
}

func processTokens(tokens []string, stack *[]int, definitions map[string][]string) error {
	for _, token := range tokens {
		if def, exists := definitions[token]; exists {
			if err := processTokens(def, stack, definitions); err != nil {
				return err
			}
			continue
		}
		
		if num, err := strconv.Atoi(token); err == nil {
			*stack = append(*stack, num)
			continue
		}
		
		switch token {
		case "+":
			if len(*stack) < 2 {
				return errors.New("insufficient operands")
			}
			n := len(*stack)
			(*stack)[n-2] += (*stack)[n-1]
			*stack = (*stack)[:n-1]
		case "-":
			if len(*stack) < 2 {
				return errors.New("insufficient operands")
			}
			n := len(*stack)
			(*stack)[n-2] -= (*stack)[n-1]
			*stack = (*stack)[:n-1]
		case "*":
			if len(*stack) < 2 {
				return errors.New("insufficient operands")
			}
			n := len(*stack)
			(*stack)[n-2] *= (*stack)[n-1]
			*stack = (*stack)[:n-1]
		case "/":
			if len(*stack) < 2 {
				return errors.New("insufficient operands")
			}
			n := len(*stack)
			if (*stack)[n-1] == 0 {
				return errors.New("division by zero")
			}
			(*stack)[n-2] /= (*stack)[n-1]
			*stack = (*stack)[:n-1]
		case "DUP":
			if len(*stack) < 1 {
				return errors.New("insufficient operands")
			}
			*stack = append(*stack, (*stack)[len(*stack)-1])
		case "DROP":
			if len(*stack) < 1 {
				return errors.New("insufficient operands")
			}
			*stack = (*stack)[:len(*stack)-1]
		case "SWAP":
			if len(*stack) < 2 {
				return errors.New("insufficient operands")
			}
			n := len(*stack)
			(*stack)[n-1], (*stack)[n-2] = (*stack)[n-2], (*stack)[n-1]
		case "OVER":
			if len(*stack) < 2 {
				return errors.New("insufficient operands")
			}
			n := len(*stack)
			*stack = append(*stack, (*stack)[n-2])
		default:
			return errors.New("unknown operation")
		}
	}
	return nil
}