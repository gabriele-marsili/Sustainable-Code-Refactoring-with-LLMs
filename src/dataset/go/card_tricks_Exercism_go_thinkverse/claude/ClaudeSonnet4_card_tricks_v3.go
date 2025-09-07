package cards

var favoriteCards = []int{2, 6, 9}

// FavoriteCards returns a slice with the cards 2, 6 and 9 in that order.
func FavoriteCards() []int {
	result := make([]int, len(favoriteCards))
	copy(result, favoriteCards)
	return result
}

// GetItem retrieves an item from a slice at given position.
// If the index is out of range, we want it to return -1.
func GetItem(slice []int, index int) int {
	if index < 0 || index >= len(slice) {
		return -1
	}
	return slice[index]
}

// SetItem writes an item to a slice at given position overwriting an existing value.
// If the index is out of range the value needs to be appended.
func SetItem(slice []int, index, value int) []int {
	if index < 0 || index >= len(slice) {
		if cap(slice) > len(slice) {
			slice = slice[:len(slice)+1]
			slice[len(slice)-1] = value
			return slice
		}
		return append(slice, value)
	}
	slice[index] = value
	return slice
}

// PrependItems adds an arbitrary number of values at the front of a slice.
func PrependItems(slice []int, value ...int) []int {
	if len(value) == 0 {
		return slice
	}
	result := make([]int, len(value)+len(slice))
	copy(result, value)
	copy(result[len(value):], slice)
	return result
}

// RemoveItem removes an item from a slice by modifying the existing slice.
func RemoveItem(slice []int, index int) []int {
	if index < 0 || index >= len(slice) {
		return slice
	}
	copy(slice[index:], slice[index+1:])
	return slice[:len(slice)-1]
}