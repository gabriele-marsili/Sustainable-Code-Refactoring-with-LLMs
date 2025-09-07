package listops

// IntList is an abstraction of a list of integers which we can define methods on
type IntList []int

func (s IntList) Foldl(fn func(int, int) int, initial int) int {
	for _, v := range s {
		initial = fn(initial, v)
	}
	return initial
}

func (s IntList) Foldr(fn func(int, int) int, initial int) int {
	for i := len(s) - 1; i >= 0; i-- {
		initial = fn(s[i], initial)
	}
	return initial
}

func (s IntList) Filter(fn func(int) bool) IntList {
	filtered := make(IntList, 0, len(s))
	for _, v := range s {
		if fn(v) {
			filtered = append(filtered, v)
		}
	}
	return filtered
}

func (s IntList) Length() int {
	return len(s)
}

func (s IntList) Map(fn func(int) int) IntList {
	mapped := make(IntList, len(s))
	for i, v := range s {
		mapped[i] = fn(v)
	}
	return mapped
}

func (s IntList) Reverse() IntList {
	length := len(s)
	reversed := make(IntList, length)
	for i := 0; i < length; i++ {
		reversed[i] = s[length-1-i]
	}
	return reversed
}

func (s IntList) Append(toAppend IntList) IntList {
	return append(s, toAppend...)
}

func (s IntList) Concat(lists []IntList) IntList {
	totalLen := len(s)
	for _, list := range lists {
		totalLen += len(list)
	}
	
	concatenated := make(IntList, len(s), totalLen)
	copy(concatenated, s)
	
	for _, list := range lists {
		concatenated = append(concatenated, list...)
	}
	return concatenated
}