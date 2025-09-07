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
	result := make([]interface{}, 0, 16)
	getNestedTypes(nested, &result)
	return result
}