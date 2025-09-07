package flatten

func Flatten(nested interface{}) []interface{} {
	result := make([]interface{}, 0)
	flattenRecursive(nested, &result)
	return result
}

func flattenRecursive(nested interface{}, result *[]interface{}) {
	switch v := nested.(type) {
	case []interface{}:
		for _, item := range v {
			flattenRecursive(item, result)
		}
	case int:
		*result = append(*result, v)
	}
}