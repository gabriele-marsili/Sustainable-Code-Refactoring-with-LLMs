package forth

import (
	"errors"
	"strconv"
	"strings"
)

func Forth(input []string) ([]int, error) {
	stack := make([]int, 0)
	definitions := make(map[string][]string)

	for _, line := range input {
		line = strings.ToLower(line)
		tokens := strings.Split(line, " ")

		if len(tokens) == 0 {
			continue
		}

		if tokens[0] == ":" {
			if len(tokens) < 3 {
				return nil, errors.New("invalid definition")
			}

			name := tokens[1]
			if _, err := strconv.Atoi(name); err == nil {
				return nil, errors.New("invalid definition name")
			}

			definitions[name] = tokens[2 : len(tokens)-1]
			continue
		}

		for _, token := range tokens {
			if def, ok := definitions[token]; ok {
				for _, defToken := range def {
					val, err := strconv.Atoi(defToken)
					if err == nil {
						stack = append(stack, val)
						continue
					}

					switch defToken {
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
						val := stack[len(stack)-1]
						stack = append(stack, val)
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
						val := stack[len(stack)-2]
						stack = append(stack, val)
					default:
						return nil, errors.New("undefined word: " + defToken)
					}
				}
				continue
			}

			val, err := strconv.Atoi(token)
			if err != nil {
				return nil, errors.New("undefined word: " + token)
			}
			stack = append(stack, val)
		}
	}

	return stack, nil
}