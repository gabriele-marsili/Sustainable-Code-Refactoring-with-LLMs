package binarysearch

// SearchInts performs a binary search for key in list and returns the index if
// key is found. Returns `-1` if key is not in list.
func SearchInts(list []int, key int) (index int) {
	if len(list) == 0 {
		return -1
	}
	
	start := 0
	end := len(list) - 1
	
	for start <= end {
		middle := start + (end-start)/2
		
		if list[middle] == key {
			return middle
		} else if list[middle] < key {
			start = middle + 1
		} else {
			end = middle - 1
		}
	}
	
	return -1
}

func binarySearch(list []int, key int, start int, end int) (index int) {
	if len(list) == 0 || start > end || start >= len(list) {
		return -1
	}
	
	for start <= end {
		middle := start + (end-start)/2
		
		if list[middle] == key {
			return middle
		} else if list[middle] < key {
			start = middle + 1
		} else {
			end = middle - 1
		}
	}
	
	return -1
}