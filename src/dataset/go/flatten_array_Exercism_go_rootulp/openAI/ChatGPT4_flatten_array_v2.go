package flatten

func Flatten(nested interface{}) []interface{} {
	if nested == nil {
		return nil
	}

	var result []interface{}
	var stack []interface{}
	stack = append(stack, nested)

	for len(stack) > 0 {
		// Pop the last element from the stack
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		switch v := top.(type) {
		case []interface{}:
			// Push elements in reverse order to maintain correct order
			for i := len(v) - 1; i >= 0; i-- {
				stack = append(stack, v[i])
			}
		case nil:
			continue
		default:
			result = append(result, v)
		}
	}

	return result
}