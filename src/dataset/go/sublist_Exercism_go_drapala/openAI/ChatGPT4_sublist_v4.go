package sublist

type Relation = string

func isSublist(sm, bg []int) bool {
	smLen, bgLen := len(sm), len(bg)
	for i := 0; i <= bgLen-smLen; i++ {
		match := true
		for j := 0; j < smLen; j++ {
			if sm[j] != bg[i+j] {
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
	len1, len2 := len(l1), len(l2)

	switch {
	case len1 == 0 && len2 == 0:
		return "equal"
	case len1 == 0:
		return "sublist"
	case len2 == 0:
		return "superlist"
	case len1 == len2 && isSublist(l1, l2):
		return "equal"
	case len1 < len2 && isSublist(l1, l2):
		return "sublist"
	case len1 > len2 && isSublist(l2, l1):
		return "superlist"
	default:
		return "unequal"
	}
}