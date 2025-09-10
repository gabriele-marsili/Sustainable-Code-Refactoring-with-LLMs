package binarysearch

import "fmt"

/*SearchInts finds the index of an item in a list using a binary search.*/
func SearchInts(ints []int, find int) int {
	first, last := 0, len(ints)
	for first < last {
		middle := first + (last-first)/2
		if ints[middle] < find {
			first = middle + 1
		} else {
			last = middle
		}
	}
	return first
}

/*Message displays the results of a search in a nice way.*/
func Message(ints []int, find int) string {
	if len(ints) == 0 {
		return "slice has no values"
	}

	index := SearchInts(ints, find)
	if index < len(ints) && ints[index] == find {
		switch index {
		case 0:
			return fmt.Sprintf("%d found at beginning of slice", find)
		case len(ints) - 1:
			return fmt.Sprintf("%d found at end of slice", find)
		default:
			return fmt.Sprintf("%d found at index %d", find, index)
		}
	}

	switch {
	case index == 0:
		return fmt.Sprintf("%d < all values", find)
	case index == len(ints):
		return fmt.Sprintf("%d > all %d values", find, len(ints))
	default:
		return fmt.Sprintf("%d > %d at index %d, < %d at index %d",
			find, ints[index-1], index-1, ints[index], index)
	}
}