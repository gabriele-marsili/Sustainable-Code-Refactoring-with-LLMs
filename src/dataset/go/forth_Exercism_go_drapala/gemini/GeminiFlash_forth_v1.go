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
		tokens := strings.Fields(strings.ToLower(line))

		for i := 0; i < len(tokens); i++ {
			token := tokens[i]

			if def, ok := definitions[token]; ok {
				// Inline definition expansion to avoid function call overhead
				tokens = append(tokens[:i+1], append(def, tokens[i+1:]...)...)
				tokens = tokens[:i+len(def)+1] // Adjust tokens slice after insertion
				i--                               // Re-evaluate the inserted tokens
				continue
			}

			switch token {
			case "+":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-2]
				val2 := stack[len(stack)-1]
				stack = stack[:len(stack)-2]
				stack = append(stack, val1+val2)
			case "-":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-2]
				val2 := stack[len(stack)-1]
				stack = stack[:len(stack)-2]
				stack = append(stack, val1-val2)
			case "*":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-2]
				val2 := stack[len(stack)-1]
				stack = stack[:len(stack)-2]
				stack = append(stack, val1*val2)
			case "/":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-2]
				val2 := stack[len(stack)-1]
				if val2 == 0 {
					return nil, errors.New("division by zero")
				}
				stack = stack[:len(stack)-2]
				stack = append(stack, val1/val2)
			case "dup":
				if len(stack) < 1 {
					return nil, errors.New("stack underflow")
				}
				stack = append(stack, stack[len(stack)-1])
			case "drop":
				if len(stack) < 1 {
					return nil, errors.New("stack underflow")
				}
				stack = stack[:len(stack)-1]
			case "swap":
				if len(stack) < 2 {
					return nil, errors.New("stack underflow")
				}
				val1 := stack[len(stack)-2]
				val2 := stack[len(stack)-1]
				stack[len(stack)-2] = val2
				stack[len(stack)-1] = val1
			case "over":
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

				definition := []string{}
				i += 2
				for ; i < len(tokens); i++ {
					if tokens[i] == ";" {
						break
					}
					definition = append(definition, tokens[i])
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