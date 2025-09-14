package binarysearch

func SearchInts(list []int, key int) int {
	l, r := 0, len(list)-1
	for l <= r {
		m := l + (r-l)>>1
		if list[m] < key {
			l = m + 1
		} else if list[m] > key {
			r = m - 1
		} else {
			return m
		}
	}
	return -1
}