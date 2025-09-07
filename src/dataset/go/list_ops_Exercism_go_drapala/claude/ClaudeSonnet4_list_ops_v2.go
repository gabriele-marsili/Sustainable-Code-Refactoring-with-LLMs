package listops

// IntList is an abstraction of a list of integers which we can define methods on
type IntList []int

// Fold: 
// https://en.wikipedia.org/wiki/Fold_%28higher-order_function%29
// https://burgaud.com/foldl-foldr-python

func (s IntList) Foldl(fn func(int, int) int, initial int) int {
	result := initial
	for _, v := range s {
		result = fn(result, v)
	}
	return result
}

func (s IntList) Foldr(fn func(int, int) int, initial int) int {
	result := initial
	for i := len(s) - 1; i >= 0; i-- {
		result = fn(s[i], result)
	}
	return result
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
	totalLen := len(s)
	for _, lst := range lists {
		totalLen += len(lst)
	}
	
	result := make(IntList, totalLen)
	offset := copy(result, s)
	
	for _, lst := range lists {
		offset += copy(result[offset:], lst)
	}
	
	return result
}