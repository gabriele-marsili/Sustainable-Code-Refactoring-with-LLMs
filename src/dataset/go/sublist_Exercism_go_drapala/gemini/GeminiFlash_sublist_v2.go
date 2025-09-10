package sublist

type Relation = string

func Sublist(l1, l2 []int) Relation {
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

	var shorter, longer []int
	shorterLen, longerLen := len1, len2
	if len1 > len2 {
		shorter, longer = l2, l1
		shorterLen, longerLen = len2, len1
	} else {
		shorter, longer = l1, l2
	}

	for i := 0; i <= longerLen-shorterLen; i++ {
		match := true
		for j := 0; j < shorterLen; j++ {
			if shorter[j] != longer[i+j] {
				match = false
				break
			}
		}
		if match {
			if shorterLen == longerLen {
				return "equal"
			}
			if len1 > len2 {
				return "superlist"
			}
			return "sublist"
		}
	}

	return "unequal"
}