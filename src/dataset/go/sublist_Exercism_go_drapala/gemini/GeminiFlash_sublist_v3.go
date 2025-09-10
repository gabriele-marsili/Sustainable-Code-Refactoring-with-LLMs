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

	if len1 == len2 {
		equal := true
		for i := 0; i < len1; i++ {
			if l1[i] != l2[i] {
				equal = false
				break
			}
		}
		if equal {
			return "equal"
		}
	}

	var shorter, longer []int
	var shorterLen, longerLen int

	if len1 < len2 {
		shorter = l1
		longer = l2
		shorterLen = len1
		longerLen = len2
	} else {
		shorter = l2
		longer = l1
		shorterLen = len2
		longerLen = len1
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
			if len1 < len2 {
				return "sublist"
			} else {
				return "superlist"
			}
		}
	}

	return "unequal"
}