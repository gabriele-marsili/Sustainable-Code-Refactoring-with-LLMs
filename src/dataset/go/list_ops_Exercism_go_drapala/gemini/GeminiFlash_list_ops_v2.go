package listops

// IntList is an abstraction of a list of integers which we can define methods on
type IntList []int

// Foldl applies fn to each element of the list from left to right, accumulating the result.
func (s IntList) Foldl(fn func(int, int) int, initial int) int {
	for _, v := range s {
		initial = fn(initial, v)
	}
	return initial
}

// Foldr applies fn to each element of the list from right to left, accumulating the result.
func (s IntList) Foldr(fn func(int, int) int, initial int) int {
	for i := len(s) - 1; i >= 0; i-- {
		initial = fn(s[i], initial)
	}
	return initial
}

// Filter returns a new list containing only the elements of the original list that satisfy the given predicate.
func (s IntList) Filter(fn func(int) bool) IntList {
	result := make(IntList, 0, len(s)) // Pre-allocate capacity
	for _, v := range s {
		if fn(v) {
			result = append(result, v)
		}
	}
	return result
}

// Length returns the number of elements in the list.
func (s IntList) Length() int {
	return len(s)
}

// Map applies fn to each element of the list and returns a new list containing the results.
func (s IntList) Map(fn func(int) int) IntList {
	result := make(IntList, len(s)) // Pre-allocate the slice
	for i, v := range s {
		result[i] = fn(v)
	}
	return result
}

// Reverse returns a new list with the elements of the original list in reverse order.
func (s IntList) Reverse() IntList {
	result := make(IntList, len(s))
	for i, v := range s {
		result[len(s)-1-i] = v
	}
	return result
}

// Append returns a new list containing the elements of the original list followed by the elements of the given list.
func (s IntList) Append(lst IntList) IntList {
	result := make(IntList, len(s), len(s)+len(lst)) // Initialize with s's length and capacity for both
	copy(result, s)                                  // Copy s into result
	result = append(result, lst...)                  // Append lst to result
	return result
}

// Concat returns a new list containing the concatenation of the original list with all the lists in the given slice.
func (s IntList) Concat(lists []IntList) IntList {
	totalLength := len(s)
	for _, lst := range lists {
		totalLength += len(lst)
	}

	result := make(IntList, len(s), totalLength)
	copy(result, s)

	for _, lst := range lists {
		result = append(result, lst...)
	}
	return result
}