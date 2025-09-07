package listops

// IntList is an abstraction of a list of integers which we can define methods on
type IntList []int

// Foldl applies fn to each element of s from left to right, accumulating the result.
func (s IntList) Foldl(fn func(int, int) int, initial int) int {
	acc := initial
	for _, v := range s {
		acc = fn(acc, v)
	}
	return acc
}

// Foldr applies fn to each element of s from right to left, accumulating the result.
func (s IntList) Foldr(fn func(int, int) int, initial int) int {
	acc := initial
	for i := len(s) - 1; i >= 0; i-- {
		acc = fn(s[i], acc)
	}
	return acc
}

// Filter returns a new IntList containing only the elements of s that satisfy fn.
func (s IntList) Filter(fn func(int) bool) IntList {
	result := make(IntList, 0, len(s)) // Pre-allocate capacity
	for _, v := range s {
		if fn(v) {
			result = append(result, v)
		}
	}
	return result
}

// Length returns the number of elements in s.
func (s IntList) Length() int {
	return len(s)
}

// Map applies fn to each element of s and returns a new IntList with the results.
func (s IntList) Map(fn func(int) int) IntList {
	result := make(IntList, len(s)) // Pre-allocate the exact size
	for i, v := range s {
		result[i] = fn(v)
	}
	return result
}

// Reverse returns a new IntList with the elements of s in reverse order.
func (s IntList) Reverse() IntList {
	result := make(IntList, len(s))
	for i, v := range s {
		result[len(s)-1-i] = v
	}
	return result
}

// Append returns a new IntList containing the elements of s followed by the elements of lst.
func (s IntList) Append(lst IntList) IntList {
	result := make(IntList, len(s)+len(lst))
	copy(result, s)
	copy(result[len(s):], lst)
	return result
}

// Concat returns a new IntList containing the concatenation of s with all lists in lists.
func (s IntList) Concat(lists []IntList) IntList {
	totalLength := len(s)
	for _, lst := range lists {
		totalLength += len(lst)
	}

	result := make(IntList, totalLength)
	copy(result, s)
	offset := len(s)

	for _, lst := range lists {
		copy(result[offset:], lst)
		offset += len(lst)
	}
	return result
}