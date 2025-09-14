package binarysearch

// SearchInts performs a binary search for key in list and returns the index if
// key is found. Returns `-1` if key is not in list.
func SearchInts(list []int, key int) (index int) {
	if len(list) == 0 {
		return -1
	}
	
	left, right := 0, len(list)-1
	
	for left <= right {
		middle := left + (right-left)/2
		
		if list[middle] == key {
			return middle
		} else if list[middle] < key {
			left = middle + 1
		} else {
			right = middle - 1
		}
	}
	
	return -1
}

func binarySearch(list []int, key int, start int, end int) (index int) {
	return SearchInts(list[start:end+1], key)
}