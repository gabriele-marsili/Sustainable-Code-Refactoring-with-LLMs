package sublist

type Relation = string

func Sublist(l1, l2 []int) string {
	len1 := len(l1)
	len2 := len(l2)

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
	var lenSm, lenBg int

	if len1 >= len2 {
		sm = l2
		bg = l1
		lenSm = len2
		lenBg = len1
	} else {
		sm = l1
		bg = l2
		lenSm = len1
		lenBg = len2
	}

	for i := 0; i <= lenBg-lenSm; i++ {
		match := true
		for j := 0; j < lenSm; j++ {
			if sm[j] != bg[i+j] {
				match = false
				break
			}
		}
		if match {
			if lenSm == lenBg {
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