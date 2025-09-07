package listops

// IntList is an abstraction of a list of integers which we can define methods on
type IntList []int

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
	for i, j := 0, len(s)-1; i < len(s); i, j = i+1, j-1 {
		result[i] = s[j]
	}
	return result
}

func (s IntList) Append(lst IntList) IntList {
	result := make(IntList, len(s), len(s)+len(lst))
	copy(result, s)
	result = append(result, lst...)
	return result
}

func (s IntList) Concat(lists []IntList) IntList {
	totalLen := len(s)
	for _, lst := range lists {
		totalLen += len(lst)
	}

	result := make(IntList, len(s), totalLen)
	copy(result, s)

	for _, lst := range lists {
		result = append(result, lst...)
	}
	return result
}