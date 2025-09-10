package binarysearch

func SearchInts(list []int, key int) int {
	min := 0
	max := len(list)
	for min < max {
		mid := min + (max-min)/2 // Prevent potential overflow
		if list[mid] == key {
			return mid
		} else if list[mid] < key {
			min = mid + 1
		} else {
			max = mid
		}
	}
	return -1
}