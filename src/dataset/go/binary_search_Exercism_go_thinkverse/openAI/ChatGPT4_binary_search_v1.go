package binarysearch

func SearchInts(list []int, key int) int {
	min, max := 0, len(list)-1
	for min <= max {
		guess := min + (max-min)>>1 // Avoid potential overflow with (min + max) / 2
		if list[guess] == key {
			return guess
		} else if list[guess] < key {
			min = guess + 1
		} else {
			max = guess - 1
		}
	}
	return -1
}