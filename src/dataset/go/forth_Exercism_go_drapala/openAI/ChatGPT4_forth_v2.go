package forth

import (
	"errors"
	"strconv"
)

func Forth(input []string) ([]int, error) {
	stack := []int{}

	for _, token := range input {
		switch token {
		case "+":
			if len(stack) < 2 {
				return nil, errors.New("not enough operands for '+'")
			}
			a, b := stack[len(stack)-2], stack[len(stack)-1]
			stack = stack[:len(stack)-2]
			stack = append(stack, a+b)
		case "-":
			if len(stack) < 2 {
				return nil, errors.New("not enough operands for '-'")
			}
			a, b := stack[len(stack)-2], stack[len(stack)-1]
			stack = stack[:len(stack)-2]
			stack = append(stack, a-b)
		case "*":
			if len(stack) < 2 {
				return nil, errors.New("not enough operands for '*'")
			}
			a, b := stack[len(stack)-2], stack[len(stack)-1]
			stack = stack[:len(stack)-2]
			stack = append(stack, a*b)
		case "/":
			if len(stack) < 2 {
				return nil, errors.New("not enough operands for '/'")
			}
			a, b := stack[len(stack)-2], stack[len(stack)-1]
			if b == 0 {
				return nil, errors.New("division by zero")
			}
			stack = stack[:len(stack)-2]
			stack = append(stack, a/b)
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