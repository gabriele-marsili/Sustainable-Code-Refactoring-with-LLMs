package strain

// Ints is a collection of integers.
type Ints []int

// Lists is a collection of integer slices.
type Lists [][]int

// Strings is a collection of strings.
type Strings []string

func (ints Ints) Keep(test func(int) bool) Ints {
	kept := make(Ints, 0, len(ints))
	for _, i := range ints {
		if test(i) {
			kept = append(kept, i)
		}
	}
	return kept
}

func (ints Ints) Discard(test func(int) bool) Ints {
	kept := make(Ints, 0, len(ints))
	for _, i := range ints {
		if !test(i) {
			kept = append(kept, i)
		}
	}
	return kept
}

func (lists Lists) Keep(test func([]int) bool) Lists {
	kept := make(Lists, 0, len(lists))
	for _, list := range lists {
		if test(list) {
			kept = append(kept, list)
		}
	}
	return kept
}

func (strings Strings) Keep(test func(string) bool) Strings {
	kept := make(Strings, 0, len(strings))
	for _, str := range strings {
		if test(str) {
			kept = append(kept, str)
		}
	}
	return kept
}