package flatten

func Flatten(nested interface{}) []interface{} {
	result := []interface{}{}
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