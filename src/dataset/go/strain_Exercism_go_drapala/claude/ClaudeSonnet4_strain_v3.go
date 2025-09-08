package strain

type Ints []int
type Lists [][]int
type Strings []string

func (i Ints) Keep(filter func(int) bool) Ints {
	if len(i) == 0 {
		return nil
	}
	result := make(Ints, 0, len(i))
	for _, value := range i {
		if filter(value) {
			result = append(result, value)
		}
	}
	return result
}

func (i Ints) Discard(filter func(int) bool) Ints {
	if len(i) == 0 {
		return nil
	}
	result := make(Ints, 0, len(i))
	for _, value := range i {
		if !filter(value) {
			result = append(result, value)
		}
	}
	return result
}

func (l Lists) Keep(filter func([]int) bool) Lists {
	if len(l) == 0 {
		return nil
	}
	result := make(Lists, 0, len(l))
	for _, list := range l {
		if filter(list) {
			result = append(result, list)
		}
	}
	return result
}

func (s Strings) Keep(filter func(string) bool) Strings {
	if len(s) == 0 {
		return nil
	}
	result := make(Strings, 0, len(s))
	for _, value := range s {
		if filter(value) {
			result = append(result, value)
		}
	}
	return result
}