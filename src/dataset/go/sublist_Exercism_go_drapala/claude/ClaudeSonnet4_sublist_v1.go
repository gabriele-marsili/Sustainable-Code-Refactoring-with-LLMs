package sublist

type Relation = string

func Sublist(l1, l2 []int) string {
	len1, len2 := len(l1), len(l2)
	
	// Handle empty cases
	if len1 == 0 && len2 == 0 {
		return "equal"
	}
	if len1 == 0 {
		return "sublist"
	}
	if len2 == 0 {
		return "superlist"
	}
	
	// Check if lists are equal
	if len1 == len2 {
		for i := 0; i < len1; i++ {
			if l1[i] != l2[i] {
				return "unequal"
			}
		}
		return "equal"
	}
	
	// Determine which list is smaller
	var small, large []int
	var isL1Smaller bool
	
	if len1 < len2 {
		small, large = l1, l2
		isL1Smaller = true
	} else {
		small, large = l2, l1
		isL1Smaller = false
	}
	
	smallLen := len(small)
	largeLen := len(large)
	
	// Search for sublist using optimized approach
	for i := 0; i <= largeLen-smallLen; i++ {
		if large[i] == small[0] {
			match := true
			for j := 1; j < smallLen; j++ {
				if large[i+j] != small[j] {
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