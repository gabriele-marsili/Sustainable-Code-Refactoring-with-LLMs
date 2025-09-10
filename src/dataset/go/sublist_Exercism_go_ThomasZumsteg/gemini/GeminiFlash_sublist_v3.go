package sublist

type Relation string

func Sublist(list1 []int, list2 []int) Relation {
	len1 := len(list1)
	len2 := len(list2)

	if len1 == len2 {
		if equal(list1, list2) {
			return "equal"
		}
		return "unequal"
	} else if len1 > len2 {
		if contains(list1, list2) {
			return "superlist"
		}
		return "unequal"
	} else {
		if contains(list2, list1) {
			return "sublist"
		}
		return "unequal"
	}
}

func equal(list1 []int, list2 []int) bool {
	if len(list1) != len(list2) {
		return false
	}
	for i := range list1 {
		if list1[i] != list2[i] {
			return false
		}
	}
	return true
}

func contains(list1 []int, list2 []int) bool {
	len1 := len(list1)
	len2 := len(list2)

	if len2 == 0 {
		return true
	}

	if len2 > len1 {
		return false
	}

	for i := 0; i <= len1-len2; i++ {
		found := true
		for j := 0; j < len2; j++ {
			if list1[i+j] != list2[j] {
				found = false
				break
			}
		}
		if found {
			return true
		}
	}
	return false
}