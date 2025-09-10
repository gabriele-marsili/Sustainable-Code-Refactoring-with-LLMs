package forth

func Forth(input []string) ([]int, error) {
	stack := make([]int, 0, len(input))
	for _, token := range input {
		switch token {
		case "+":
			if len(stack) < 2 {
				return nil, fmt.Errorf("insufficient values in stack for operation")
			}
			stack[len(stack)-2] += stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		case "-":
			if len(stack) < 2 {
				return nil, fmt.Errorf("insufficient values in stack for operation")
			}
			stack[len(stack)-2] -= stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		case "*":
			if len(stack) < 2 {
				return nil, fmt.Errorf("insufficient values in stack for operation")
			}
			stack[len(stack)-2] *= stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		case "/":
			if len(stack) < 2 {
				return nil, fmt.Errorf("insufficient values in stack for operation")
			}
			if stack[len(stack)-1] == 0 {
				return nil, fmt.Errorf("division by zero")
			}
			stack[len(stack)-2] /= stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		default:
			num, err := strconv.Atoi(token)
			if err != nil {
				return nil, fmt.Errorf("invalid token: %s", token)
			}
			stack = append(stack, num)
		}
	}
	return stack, nil
}