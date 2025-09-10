package binarysearch

import "fmt"

/*SearchInts finds the index of an item in a list using a binary search.*/
func SearchInts(ints []int, find int) int {
	low := 0
	high := len(ints) - 1

	for low <= high {
		mid := low + (high-low)/2 // Prevents potential overflow
		if ints[mid] == find {
			return mid
		} else if ints[mid] < find {
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return low
}

/*Message displays the results of a search in a nice way.*/
func Message(ints []int, find int) string {
	n := len(ints)

	if n == 0 {
		return "slice has no values"
	}

	index := SearchInts(ints, find)

	if index < n && ints[index] == find {
		if index == 0 {
			return fmt.Sprintf("%d found at beginning of slice", find)
		} else if index == n-1 {
			return fmt.Sprintf("%d found at end of slice", find)
		} else {
			return fmt.Sprintf("%d found at index %d", find, index)
		}
	} else {
		if index == 0 {
			return fmt.Sprintf("%d < all values", find)
		} else if index == n {
			return fmt.Sprintf("%d > all %d values", find, n)
		} else {
			return fmt.Sprintf("%d > %d at index %d, < %d at index %d",
				find, ints[index-1], index-1, ints[index], index)
		}
	}
}