package cards

func FavoriteCards() []int {
	return []int{2, 6, 9}
}

func GetItem(slice []int, index int) int {
	if index >= 0 && index < len(slice) {
		return slice[index]
	}
	return -1
}

func SetItem(slice []int, index, value int) []int {
	if index >= 0 && index < len(slice) {
		slice[index] = value
		return slice
	}
	return append(slice, value)
}

func PrependItems(slice []int, value ...int) []int {
	if len(value) == 0 {
		return slice
	}
	return append(value, slice...)
}

func RemoveItem(slice []int, index int) []int {
	if index >= 0 && index < len(slice) {
		copy(slice[index:], slice[index+1:])
		return slice[:len(slice)-1]
	}
	return slice
}