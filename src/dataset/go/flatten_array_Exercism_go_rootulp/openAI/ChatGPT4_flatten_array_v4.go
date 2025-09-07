package flatten

func Flatten(nested interface{}) []interface{} {
	if nested == nil {
		return nil
	}
	result := make([]interface{}, 0)
	var stack []interface{}
	stack = append(stack, nested)

	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if top == nil {
			continue
		}

		if slice, ok := top.([]interface{}); ok {
			stack = append(stack, slice...)
		} else {
			result = append(result, top)
		}
	}

	return result
}