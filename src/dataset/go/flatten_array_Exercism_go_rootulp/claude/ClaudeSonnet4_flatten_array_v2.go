package flatten

func Flatten(nested interface{}) []interface{} {
	slice := nested.([]interface{})
	if len(slice) == 0 {
		return []interface{}{}
	}
	
	// Pre-calculate capacity to reduce allocations
	capacity := estimateCapacity(slice)
	result := make([]interface{}, 0, capacity)
	
	return flattenRecursive(slice, result)
}

func flattenRecursive(slice []interface{}, result []interface{}) []interface{} {
	for _, element := range slice {
		if element == nil {
			continue
		}
		if nestedSlice, ok := element.([]interface{}); ok {
			result = flattenRecursive(nestedSlice, result)
		} else {
			result = append(result, element)
		}
	}
	return result
}

func estimateCapacity(slice []interface{}) int {
	capacity := 0
	for _, element := range slice {
		if element == nil {
			continue
		}
		if nestedSlice, ok := element.([]interface{}); ok {
			capacity += estimateCapacity(nestedSlice)
		} else {
			capacity++
		}
	}
	return capacity
}