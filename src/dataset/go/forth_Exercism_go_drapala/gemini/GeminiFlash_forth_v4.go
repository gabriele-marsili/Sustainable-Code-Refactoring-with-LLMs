package forth

import (
	"errors"
	"strconv"
	"strings"
)

type stack []int

func (s *stack) push(v int) {
	*s = append(*s, v)
}

func (s *stack) pop() (int, error) {
	if len(*s) == 0 {
		return 0, errors.New("stack empty")
	}
	v := (*s)[len(*s)-1]
	*s = (*s)[:len(*s)-1]
	return v, nil
}

func (s *stack) peek() (int, error) {
	if len(*s) == 0 {
		return 0, errors.New("stack empty")
	}
	return (*s)[len(*s)-1], nil
}

func Forth(input []string) ([]int, error) {
	stack := stack{}
	definitions := make(map[string][]string)

	for _, line := range input {
		tokens := strings.Fields(strings.ToLower(line))

		for i := 0; i < len(tokens); i++ {
			token := tokens[i]

			if def, ok := definitions[token]; ok {
				tokens = append(tokens[:i+1], append(def, tokens[i+1:]...)...)
				tokens = tokens[:i+1+len(def)]
				i--
				continue
			}

			switch token {
			case "+":
				a, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				b, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				stack.push(b + a)
			case "-":
				a, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				b, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				stack.push(b - a)
			case "*":
				a, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				b, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				stack.push(b * a)
			case "/":
				a, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				if a == 0 {
					return nil, errors.New("division by zero")
				}
				b, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				stack.push(b / a)
			case "dup":
				v, err := stack.peek()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				stack.push(v)
			case "drop":
				_, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
			case "swap":
				a, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				b, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				stack.push(a)
				stack.push(b)
			case "over":
				a, err := stack.pop()
				if err != nil {
					return nil, errors.New("stack empty")
				}
				b, err := stack.peek()
				if err != nil {
					stack.push(a)
					return nil, errors.New("stack empty")
				}
				stack.push(a)
				stack.push(b)
			case ":":
				if i+2 >= len(tokens) || tokens[i+len(tokens)-1] != ";" {
					return nil, errors.New("invalid definition")
				}
				defName := tokens[i+1]
				defBody := tokens[i+2 : len(tokens)-1]
				definitions[defName] = defBody
				i = len(tokens)
			default:
				num, err := strconv.Atoi(token)
				if err != nil {
					return nil, errors.New("undefined word")
				}
				stack.push(num)
			}
		}
	}

	return stack, nil
}