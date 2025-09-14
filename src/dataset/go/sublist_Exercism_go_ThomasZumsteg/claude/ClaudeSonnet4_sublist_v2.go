package sublist

type Relation string

func Sublist(list1 []int, list2 []int) Relation {
	len1, len2 := len(list1), len(list2)
	diff := len1 - len2
	
	if diff == 0 {
		if isEqual(list1, list2) {
			return "equal"
		}
		return "unequal"
	} else if diff > 0 {
		if isSubsequence(list1, list2) {
			return "superlist"
		}
	} else {
		if isSubsequence(list2, list1) {
			return "sublist"
		}
	}
	return "unequal"
}

func isEqual(list1, list2 []int) bool {
	for i := 0; i < len(list1); i++ {
		if list1[i] != list2[i] {
			return false
		}
	}
	return true
}

func isSubsequence(longer, shorter []int) bool {
	if len(shorter) == 0 {
		return true
	}
	
	maxStart := len(longer) - len(shorter)
	for i := 0; i <= maxStart; i++ {
		match := true
		for j := 0; j < len(shorter); j++ {
			if longer[i+j] != shorter[j] {
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