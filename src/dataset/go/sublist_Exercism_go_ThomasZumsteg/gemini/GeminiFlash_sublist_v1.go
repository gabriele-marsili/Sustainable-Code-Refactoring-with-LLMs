package sublist

type Relation string

func Sublist(list1 []int, list2 []int) Relation {
	len1 := len(list1)
	len2 := len(list2)

	if len1 == len2 {
		for i := 0; i < len1; i++ {
			if list1[i] != list2[i] {
				return "unequal"
			}
		}
		return "equal"
	} else if len1 > len2 {
		if isSublist(list1, list2) {
			return "superlist"
		}
	} else {
		if isSublist(list2, list1) {
			return "sublist"
		}
	}
	return "unequal"
}

func isSublist(list1 []int, list2 []int) bool {
	len1 := len(list1)
	len2 := len(list2)

	if len2 == 0 {
		return true
	}

	for i := 0; i <= len1-len2; i++ {
		match := true
		for j := 0; j < len2; j++ {
			if list1[i+j] != list2[j] {
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