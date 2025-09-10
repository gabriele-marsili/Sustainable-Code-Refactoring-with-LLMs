package sublist

type Relation = string

func Sublist(l1, l2 []int) string {
	len1, len2 := len(l1), len(l2)

	if len1 == 0 && len2 == 0 {
		return "equal"
	}
	if len1 == 0 {
		return "sublist"
	}
	if len2 == 0 {
		return "superlist"
	}

	var sm, bg []int
	var smLen, bgLen int

	if len1 >= len2 {
		sm, bg = l2, l1
		smLen, bgLen = len2, len1
	} else {
		sm, bg = l1, l2
		smLen, bgLen = len1, len2
	}

	for i := 0; i <= bgLen-smLen; i++ {
		match := true
		for j := 0; j < smLen; j++ {
			if sm[j] != bg[i+j] {
				match = false
				break
			}
		}
		if match {
			if smLen == bgLen {
				return "equal"
			}
			if len1 >= len2 {
				return "superlist"
			}
			return "sublist"
		}
	}

	return "unequal"
}