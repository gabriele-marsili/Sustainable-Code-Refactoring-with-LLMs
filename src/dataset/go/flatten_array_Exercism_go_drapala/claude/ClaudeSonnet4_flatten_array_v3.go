package flatten

func getNestedTypes(nested interface{}, result *[]interface{}) {
	switch v := nested.(type) {
	case int:
		*result = append(*result, v)
	case []interface{}:
		for _, item := range v {
			getNestedTypes(item, result)
		}
	}
}

func Flatten(nested interface{}) []interface{} {
	result := make([]interface{}, 0, estimateCapacity(nested))
	getNestedTypes(nested, &result)
	return result
}

func estimateCapacity(nested interface{}) int {
	switch v := nested.(type) {
	case int:
		return 1
	case []interface{}:
		capacity := 0
		for _, item := range v {
			capacity += estimateCapacity(item)
		}
		return capacity
	}
	return 0
}