package flatten

func Flatten(nested interface{}) []interface{} {
	var result []interface{}
	var stack []interface{}
	stack = append(stack, nested)

	for len(stack) > 0 {
		// Pop the last element from the stack
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if current == nil {
			continue
		}

		if slice, ok := current.([]interface{}); ok {
			// Push elements in reverse order to maintain correct order
			for i := len(slice) - 1; i >= 0; i-- {
				stack = append(stack, slice[i])
			}
		} else {
			result = append(result, current)
		}
	}

	return result
}