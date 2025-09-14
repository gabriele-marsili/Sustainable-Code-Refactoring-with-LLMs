package sublist

type Relation string

func Sublist(list1 []int, list2 []int) Relation {
	len1, len2 := len(list1), len(list2)
	
	if len1 == len2 {
		if slicesEqual(list1, list2) {
			return "equal"
		}
		return "unequal"
	}
	
	if len1 > len2 {
		if len2 == 0 || contains(list1, list2) {
			return "superlist"
		}
	} else {
		if len1 == 0 || contains(list2, list1) {
			return "sublist"
		}
	}
	
	return "unequal"
}

func slicesEqual(a, b []int) bool {
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func contains(haystack, needle []int) bool {
	needleLen := len(needle)
	if needleLen == 0 {
		return true
	}
	
	maxStart := len(haystack) - needleLen
	for i := 0; i <= maxStart; i++ {
		if haystack[i] == needle[0] {
			match := true
			for j := 1; j < needleLen; j++ {
				if haystack[i+j] != needle[j] {
					match = false
					break
				}
			}
			if match {
				return true
			}
		}
	}
	return false
}

func Compare(list1 []int, list2 []int) bool {
	return contains(list1, list2)
}