package sublist

type Relation = string

func Sublist(l1, l2 []int) string {
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
	
	if len1 == len2 {
		for i := 0; i < len1; i++ {
			if l1[i] != l2[i] {
				return "unequal"
			}
		}
		return "equal"
	}
	
	var smaller, larger []int
	var isL1Smaller bool
	
	if len1 < len2 {
		smaller, larger = l1, l2
		isL1Smaller = true
	} else {
		smaller, larger = l2, l1
		isL1Smaller = false
	}
	
	smallerLen := len(smaller)
	searchLimit := len(larger) - smallerLen + 1
	
	for i := 0; i < searchLimit; i++ {
		if larger[i] == smaller[0] {
			match := true
			for j := 1; j < smallerLen; j++ {
				if larger[i+j] != smaller[j] {
					match = false
					break
				}
			}
			if match {
				if isL1Smaller {
					return "sublist"
				}
				return "superlist"
			}
		}
	}
	
	return "unequal"
}