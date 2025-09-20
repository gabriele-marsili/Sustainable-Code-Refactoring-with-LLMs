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
	result := []interface{}{}
	getNestedTypes(nested, &result)
	return result
}