package flatten

func Flatten(nested interface{}) []interface{} {
	result := make([]interface{}, 0)
	flattenRecursive(nested, &result)
	return result
}

func flattenRecursive(nested interface{}, result *[]interface{}) {
	switch v := nested.(type) {
	case int:
		*result = append(*result, v)
	case []interface{}:
		for _, element := range v {
			flattenRecursive(element, result)
		}
	}
}