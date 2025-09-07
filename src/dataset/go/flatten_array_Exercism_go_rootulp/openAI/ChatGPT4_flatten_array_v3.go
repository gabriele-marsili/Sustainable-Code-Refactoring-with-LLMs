package flatten

func Flatten(nested interface{}) []interface{} {
	var result []interface{}
	var stack []interface{}
	stack = append(stack, nested)

	for len(stack) > 0 {
		curr := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if curr == nil {
			continue
		}

		if slice, ok := curr.([]interface{}); ok {
			for i := len(slice) - 1; i >= 0; i-- {
				stack = append(stack, slice[i])
			}
		} else {
			result = append(result, curr)
		}
	}

	return result
}