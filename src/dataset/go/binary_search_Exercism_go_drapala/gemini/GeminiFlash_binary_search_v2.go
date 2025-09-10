package binarysearch

func SearchInts(list []int, key int) int {
	l := 0
	r := len(list)
	for l < r {
		m := l + (r-l)/2
		if list[m] < key {
			l = m + 1
		} else if list[m] > key {
			r = m
		} else {
			return m
		}
	}
	return -1
}