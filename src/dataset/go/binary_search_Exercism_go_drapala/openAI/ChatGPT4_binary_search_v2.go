package binarysearch

func SearchInts(list []int, key int) int {
	l, r := 0, len(list)-1
	for l <= r {
		m := l + (r-l)>>1 // Avoid potential overflow with (l + r) / 2
		if list[m] == key {
			return m // Found
		}
		if list[m] < key {
			l = m + 1 // Go to right half
		} else {
			r = m - 1 // Go to left half
		}
	}
	return -1 // Not found
}