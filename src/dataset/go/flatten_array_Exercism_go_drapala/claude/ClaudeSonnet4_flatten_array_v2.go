package flatten

func Flatten(nested interface{}) []interface{} {
	var result []interface{}
	flatten(nested, &result)
	return result
}

func flatten(nested interface{}, result *[]interface{}) {
	switch v := nested.(type) {
	case int:
		*result = append(*result, v)
	case []interface{}:
		for _, item := range v {
			flatten(item, result)
		}
	}
}