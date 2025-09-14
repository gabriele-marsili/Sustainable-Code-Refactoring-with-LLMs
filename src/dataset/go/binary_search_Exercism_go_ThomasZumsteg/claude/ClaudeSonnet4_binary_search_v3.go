package binarysearch

import "fmt"

/*SearchInts finds the index of an item in a list using a binary search.*/
func SearchInts(ints []int, find int) int {
	first, last := 0, len(ints)-1
	for first <= last {
		middle := first + (last-first)>>1
		if find <= ints[middle] {
			last = middle - 1
		} else {
			first = middle + 1
		}
	}
	return first
}

/*Message displays the results of a search in a nice way.*/
func Message(ints []int, find int) string {
	length := len(ints)
	if length == 0 {
		return "slice has no values"
	}
	
	index := SearchInts(ints, find)
	
	beyondEnd := index == length
	if !beyondEnd && ints[index] == find {
		switch index {
		case 0:
			return fmt.Sprintf("%d found at beginning of slice", find)
		case length - 1:
			return fmt.Sprintf("%d found at end of slice", find)
		default:
			return fmt.Sprintf("%d found at index %d", find, index)
		}
	}
	
	switch index {
	case 0:
		return fmt.Sprintf("%d < all values", find)
	case length:
		return fmt.Sprintf("%d > all %d values", find, length)
	default:
		return fmt.Sprintf("%d > %d at index %d, < %d at index %d",
			find, ints[index-1], index-1, ints[index], index)
	}
}