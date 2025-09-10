package binarysearch

func SearchInts(list []int, key int) int {
	l, r := 0, len(list)-1
	for l <= r {
		m := l + (r-l)>>1 // Avoid potential overflow
		switch {
		case list[m] < key:
			l = m + 1
		case list[m] > key:
			r = m - 1
		default:
			return m
		}
	}
	return -1
}