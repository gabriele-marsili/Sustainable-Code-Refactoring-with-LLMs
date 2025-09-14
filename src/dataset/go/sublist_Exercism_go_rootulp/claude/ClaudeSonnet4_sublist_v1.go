package sublist

type Relation string

func Sublist(a []int, b []int) Relation {
	if len(a) == len(b) {
		if slicesEqual(a, b) {
			return "equal"
		}
		return "unequal"
	} else if len(a) < len(b) {
		if isSublist(a, b) {
			return "sublist"
		}
		return "unequal"
	} else {
		if isSublist(b, a) {
			return "superlist"
		}
		return "unequal"
	}
}

// slicesEqual checks if two slices are equal
func slicesEqual(a, b []int) bool {
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

// isSublist returns true if a is a sublist of b
func isSublist(a []int, b []int) bool {
	if len(a) == 0 {
		return true
	}
	if len(a) > len(b) {
		return false
	}
	
	for i := 0; i <= len(b)-len(a); i++ {
		match := true
		for j := 0; j < len(a); j++ {
			if b[i+j] != a[j] {
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