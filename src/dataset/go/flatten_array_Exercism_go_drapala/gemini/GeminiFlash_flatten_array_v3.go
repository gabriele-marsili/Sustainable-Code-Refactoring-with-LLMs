package flatten

func Flatten(nested interface{}) []interface{} {
	result := make([]interface{}, 0)
	flattenHelper(nested, &result)
	return result
}

func flattenHelper(nested interface{}, result *[]interface{}) {
	switch v := nested.(type) {
	case int:
		*result = append(*result, v)
	case []interface{}:
		for _, item := range v {
			flattenHelper(item, result)
		}
	case interface{}:
		// Handle other types gracefully, potentially ignoring them
		// or adding a default value if appropriate for the use case.
		// For now, we ignore other types to match the original behavior.
	}
}