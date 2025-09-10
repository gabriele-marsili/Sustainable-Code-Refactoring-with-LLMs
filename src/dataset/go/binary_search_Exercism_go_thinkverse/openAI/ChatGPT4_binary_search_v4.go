package binarysearch

func SearchInts(list []int, key int) int {
	min, max := 0, len(list)
	for min < max {
		guess := uint(min+max) >> 1 // Use unsigned shift for faster division by 2
		if list[guess] == key {
			return guess
		}
		if list[guess] < key {
			min = int(guess) + 1
		} else {
			max = int(guess)
		}
	}
	return -1
}