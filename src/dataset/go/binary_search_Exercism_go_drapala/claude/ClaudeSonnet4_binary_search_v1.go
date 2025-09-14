package binarysearch

func SearchInts(list []int, key int) int {
	l, r := 0, len(list)-1
	
	for l <= r {
		m := l + (r-l)>>1
		val := list[m]
		
		if val < key {
			l = m + 1
		} else if val > key {
			r = m - 1
		} else {
			return m
		}
	}
	return -1
}