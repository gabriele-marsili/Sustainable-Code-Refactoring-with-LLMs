package binarysearch

func SearchInts(list []int, key int) int {
	min := 0
	max := len(list)
	for min < max {
		mid := min + (max-min)/2 // Prevent potential overflow
		val := list[mid]

		if val == key {
			return mid
		} else if val < key {
			min = mid + 1
		} else {
			max = mid
		}
	}
	return -1
}