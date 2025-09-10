package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(input []string) ([]int, error) {
	stack := []int{}
	definitions := make(map[string][]string)

	for _, line := range input {
		tokens := strings.Fields(strings.ToUpper(line))

		for i := 0; i < len(tokens); i++ {
			token := tokens[i]

			if def, ok := definitions[token]; ok {
				// Inline the definition to avoid function call overhead
				tokens = append(tokens[:i+1], append(def, tokens[i+1:]...)...)
				tokens = tokens[:len(tokens)-len(tokens[i+1:])] // Correctly adjust tokens after insertion
				i--                                             // Re-evaluate the current position
				continue
			}

			switch token {
			case "+":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-1]
				val2 := stack[len(stack)-2]
				stack = stack[:len(stack)-2]
				stack = append(stack, val2+val1)
			case "-":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-1]
				val2 := stack[len(stack)-2]
				stack = stack[:len(stack)-2]
				stack = append(stack, val2-val1)
			case "*":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-1]
				val2 := stack[len(stack)-2]
				stack = stack[:len(stack)-2]
				stack = append(stack, val2*val1)
			case "/":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-1]
				val2 := stack[len(stack)-2]
				stack = stack[:len(stack)-2]
				if val1 == 0 {
					return nil, errors.New("division by zero")
				}
				stack = append(stack, val2/val1)
			case "DUP":
				if len(stack) < 1 {
					return nil, errors.New("stack underflow")
				}
				stack = append(stack, stack[len(stack)-1])
			case "DROP":
				if len(stack) < 1 {
					return nil, errors.New("stack underflow")
				}
				stack = stack[:len(stack)-1]
			case "SWAP":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-1]
				val2 := stack[len(stack)-2]
				stack[len(stack)-2] = val1
				stack[len(stack)-1] = val2
			case "OVER":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				stack = append(stack, stack[len(stack)-2])
			case ":":
				if i+2 >= len(tokens) {
					return nil, errors.New("invalid definition")
				}
				name := tokens[i+1]
				if _, err := strconv.Atoi(name); err == nil {
					return nil, errors.New("invalid definition name")
				}
				i += 2
				definition := []string{}
				for ; i < len(tokens); i++ {
					if tokens[i] == ";" {
						break
					}
					definition = append(definition, tokens[i])
				}
				if i == len(tokens) {
					return nil, errors.New("invalid definition")
				}
				definitions[name] = definition
			default:
				val, err := strconv.Atoi(token)
				if err != nil {
					return nil, errors.New("undefined word")
				}
				stack = append(stack, val)
			}
		}
	}

	return stack, nil
}