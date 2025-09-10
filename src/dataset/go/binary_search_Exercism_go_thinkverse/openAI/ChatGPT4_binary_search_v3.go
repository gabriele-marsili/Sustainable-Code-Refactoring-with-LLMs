package binarysearch

func SearchInts(list []int, key int) int {
	min, max := 0, len(list)
	for min < max {
		guess := min + (max-min)/2
		if list[guess] == key {
			return guess
		}
		if list[guess] < key {
			min = guess + 1
		} else {
			max = guess
		}
	}
	return -1
}