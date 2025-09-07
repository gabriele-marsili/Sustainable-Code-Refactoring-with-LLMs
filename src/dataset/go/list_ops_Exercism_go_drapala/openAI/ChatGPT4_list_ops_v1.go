package listops

// IntList is an abstraction of a list of integers which we can define methods on
type IntList []int

// Fold: 
// https://en.wikipedia.org/wiki/Fold_%28higher-order_function%29
// https://burgaud.com/foldl-foldr-python

func (s IntList) Foldl(fn func(int, int) int, initial int) int {
	acc := initial
	for _, v := range s {
		acc = fn(acc, v)
	}
	return acc
}

func (s IntList) Foldr(fn func(int, int) int, initial int) int {
	acc := initial
	for i := len(s) - 1; i >= 0; i-- {
		acc = fn(s[i], acc)
	}
	return acc
}

func (s IntList) Filter(fn func(int) bool) IntList {
	result := make(IntList, 0, len(s))
	for _, v := range s {
		if fn(v) {
			result = append(result, v)
		}
	}
	return result
}

func (s IntList) Length() int {
	return len(s)
}

func (s IntList) Map(fn func(int) int) IntList {
	result := make(IntList, len(s))
	for i, v := range s {
		result[i] = fn(v)
	}
	return result
}

func (s IntList) Reverse() IntList {
	result := make(IntList, len(s))
	for i, v := range s {
		result[len(s)-1-i] = v
	}
	return result
}

func (s IntList) Append(lst IntList) IntList {
	result := make(IntList, len(s)+len(lst))
	copy(result, s)
	copy(result[len(s):], lst)
	return result
}

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