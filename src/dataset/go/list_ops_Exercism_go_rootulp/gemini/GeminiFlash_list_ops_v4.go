package listops

// IntList is an abstraction of a list of integers which we can define methods on
type IntList []int

func (s IntList) Foldl(fn func(int, int) int, initial int) int {
	for i := range s {
		initial = fn(initial, s[i])
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
	reversed := make(IntList, len(s))
	for i, v := range s {
		reversed[len(s)-1-i] = v
	}
	return reversed
}

func (s IntList) Append(toAppend IntList) IntList {
	appended := make(IntList, len(s)+len(toAppend))
	copy(appended, s)
	copy(appended[len(s):], toAppend)
	return appended
}

func (s IntList) Concat(lists []IntList) IntList {
	totalLen := len(s)
	for _, list := range lists {
		totalLen += len(list)
	}
	concatenated := make(IntList, 0, totalLen)
	concatenated = append(concatenated, s...)
	for _, list := range lists {
		concatenated = append(concatenated, list...)
	}
	return concatenated
}