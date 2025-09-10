package binarysearch

// SearchInts performs a binary search for key in list and returns the index if
// key is found. Returns `-1` if key is not in list.
func SearchInts(list []int, key int) (index int) {
	low := 0
	high := len(list) - 1

	for low <= high {
		mid := low + (high-low)/2 // Prevent potential overflow
		if list[mid] == key {
			return mid
		} else if list[mid] < key {
			low = mid + 1
		} else {
			high = mid - 1
		}
	}

	return -1
}