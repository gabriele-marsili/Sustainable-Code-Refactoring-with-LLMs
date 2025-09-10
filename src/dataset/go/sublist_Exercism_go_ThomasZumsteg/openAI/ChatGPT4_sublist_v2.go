package sublist

type Relation string

func Sublist(list1 []int, list2 []int) Relation {
	len1, len2 := len(list1), len(list2)

	switch {
	case len1 == len2 && equal(list1, list2):
		return "equal"
	case len1 > len2 && isSublist(list1, list2):
		return "superlist"
	case len1 < len2 && isSublist(list2, list1):
		return "sublist"
	default:
		return "unequal"
	}
}

func equal(list1, list2 []int) bool {
	for i := range list1 {
		if list1[i] != list2[i] {
			return false
		}
	}
	return true
}

func isSublist(list1, list2 []int) bool {
	len1, len2 := len(list1), len(list2)
	for i := 0; i <= len1-len2; i++ {
		if equal(list1[i:i+len2], list2) {
			return true
		}
	}
	return false
}