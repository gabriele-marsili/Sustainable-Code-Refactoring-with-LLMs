package flatten

func Flatten(nested interface{}) []interface{} {
	result := make([]interface{}, 0)
	nestedSlice, ok := nested.([]interface{})
	if !ok {
		return result // Handle non-slice input gracefully
	}

	var flattenHelper func(interface{})
	flattenHelper = func(nested interface{}) {
		nestedSlice, ok := nested.([]interface{})
		if !ok {
			result = append(result, nested)
			return
		}

		for _, element := range nestedSlice {
			if element == nil {
				continue
			}

			if slice, ok := element.([]interface{}); ok {
				flattenHelper(slice)
			} else {
				result = append(result, element)
			}
		}
	}

	flattenHelper(nestedSlice)
	return result
}