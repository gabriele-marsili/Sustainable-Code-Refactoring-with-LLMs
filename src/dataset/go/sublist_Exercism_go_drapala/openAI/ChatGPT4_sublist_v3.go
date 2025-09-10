package sublist

type Relation = string

func firstBgMatchIndex(sm, bg []int) int {
	for i := 0; i <= len(bg)-len(sm); i++ {
		if bg[i] == sm[0] {
			return i
		}
	}
	return -1
}

func compareFromIndex(sm, bg []int, start int) bool {
	for i := 0; i < len(sm); i++ {
		if sm[i] != bg[start+i] {
			return false
		}
	}
	return true
}

func Sublist(l1, l2 []int) string {
	if len(l1) == 0 && len(l2) == 0 {
		return "equal"
	}
	if len(l1) == 0 {
		return "sublist"
	}
	if len(l2) == 0 {
		return "superlist"
	}

	sm, bg := l1, l2
	if len(l1) > len(l2) {
		sm, bg = l2, l1
	}

	for i := 0; i <= len(bg)-len(sm); i++ {
		if bg[i] == sm[0] && compareFromIndex(sm, bg, i) {
			if len(l1) == len(l2) {
				return "equal"
			}
			if len(l1) > len(l2) {
				return "superlist"
			}
			return "sublist"
		}
	}
	return "unequal"
}