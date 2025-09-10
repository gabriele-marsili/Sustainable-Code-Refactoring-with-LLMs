package sublist

type Relation = string

func isSublist(sm, bg []int) bool {
	if len(sm) > len(bg) {
		return false
	}
	for i := 0; i <= len(bg)-len(sm); i++ {
		match := true
		for j := 0; j < len(sm); j++ {
			if bg[i+j] != sm[j] {
				match = false
				break
			}
		}
		if match {
			return true
		}
	}
	return false
}

func Sublist(l1, l2 []int) string {
	switch {
	case len(l1) == 0 && len(l2) == 0:
		return "equal"
	case len(l1) == 0:
		return "sublist"
	case len(l2) == 0:
		return "superlist"
	case len(l1) == len(l2) && isSublist(l1, l2):
		return "equal"
	case len(l1) < len(l2) && isSublist(l1, l2):
		return "sublist"
	case len(l1) > len(l2) && isSublist(l2, l1):
		return "superlist"
	default:
		return "unequal"
	}
}