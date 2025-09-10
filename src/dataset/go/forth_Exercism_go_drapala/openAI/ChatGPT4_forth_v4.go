package forth

import (
	"errors"
	"strconv"
)

func Forth(input []string) ([]int, error) {
	stack := make([]int, 0, len(input)/2) // Preallocate memory for efficiency

	for _, token := range input {
		switch token {
		case "+":
			if len(stack) < 2 {
				return nil, errors.New("not enough operands for '+'")
			}
			stack[len(stack)-2] += stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		case "-":
			if len(stack) < 2 {
				return nil, errors.New("not enough operands for '-'")
			}
			stack[len(stack)-2] -= stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		case "*":
			if len(stack) < 2 {
				return nil, errors.New("not enough operands for '*'")
			}
			stack[len(stack)-2] *= stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		case "/":
			if len(stack) < 2 {
				return nil, errors.New("not enough operands for '/'")
			}
			if stack[len(stack)-1] == 0 {
				return nil, errors.New("division by zero")
			}
			stack[len(stack)-2] /= stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		default:
			num, err := strconv.Atoi(token)
			if err != nil {
				return nil, errors.New("invalid token: " + token)
			}
			stack = append(stack, num)
		}
	}

	return stack, nil
}