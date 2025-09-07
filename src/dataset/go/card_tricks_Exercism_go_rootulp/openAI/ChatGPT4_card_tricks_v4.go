package cards

func GetItem(slice []int, index int) (int, bool) {
	if index >= 0 && index < len(slice) {
		return slice[index], true
	}
	return 0, false
}

func SetItem(slice []int, index, value int) []int {
	if index < 0 || index >= len(slice) {
		return append(slice, value)
	}
	slice[index] = value
	return slice
}

func PrefilledSlice(value, length int) []int {
	if length <= 0 {
		return nil
	}
	result := make([]int, length)
	for i := range result {
		result[i] = value
	}
	return result
}

func RemoveItem(slice []int, index int) []int {
	if index < 0 || index >= len(slice) {
		return slice
	}
	copy(slice[index:], slice[index+1:])
	return slice[:len(slice)-1]
}