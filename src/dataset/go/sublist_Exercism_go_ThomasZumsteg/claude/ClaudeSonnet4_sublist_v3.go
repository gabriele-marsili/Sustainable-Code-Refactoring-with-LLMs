package sublist

type Relation string

func Sublist(list1 []int, list2 []int) Relation {
	len1, len2 := len(list1), len(list2)
	
	if len1 == len2 {
		if isEqual(list1, list2) {
			return "equal"
		}
		return "unequal"
	}
	
	if len1 > len2 {
		if len2 == 0 || Compare(list1, list2) {
			return "superlist"
		}
	} else {
		if len1 == 0 || Compare(list2, list1) {
			return "sublist"
		}
	}
	
	return "unequal"
}

func Compare(list1 []int, list2 []int) bool {
	len1, len2 := len(list1), len(list2)
	if len2 == 0 {
		return true
	}
	if len1 < len2 {
		return false
	}
	
	maxStart := len1 - len2
	for i := 0; i <= maxStart; i++ {
		if isSubsliceAt(list1, list2, i) {
			return true
		}
	}
	return false
}

func isEqual(list1, list2 []int) bool {
	for i, v := range list1 {
		if list2[i] != v {
			return false
		}
	}
	return true
}

func isSubsliceAt(list1, list2 []int, start int) bool {
	for j, v := range list2 {
		if list1[start+j] != v {
			return false
		}
	}
	return true
}