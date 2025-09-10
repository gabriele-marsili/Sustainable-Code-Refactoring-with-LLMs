package sublist

type Relation = string

func Sublist(l1, l2 []int) string {
	// Handle empty cases
	if len(l1) == 0 && len(l2) == 0 {
		return "equal"
	} else if len(l1) == 0 {
		return "sublist"
	} else if len(l2) == 0 {
		return "superlist"
	}

	// Determine smaller and larger list
	sm, bg := l1, l2
	if len(l1) > len(l2) {
		sm, bg = l2, l1
	}

	// Check if sm is a sublist of bg
	for i := 0; i <= len(bg)-len(sm); i++ {
		match := true
		for j := 0; j < len(sm); j++ {
			if bg[i+j] != sm[j] {
				match = false
				break
			}
		}
		if match {
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