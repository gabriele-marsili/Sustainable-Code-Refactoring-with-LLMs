package flatten

func Flatten(nested interface{}) []interface{} {
	result := make([]interface{}, 0)
	nestedSlice, ok := nested.([]interface{})
	if !ok {
		return result
	}

	for _, element := range nestedSlice {
		if element == nil {
			continue
		}

		if slice, ok := element.([]interface{}); ok {
			flattened := Flatten(slice)
			result = append(result, flattened...)
		} else {
			result = append(result, element)
		}
	}
	return result
}