package sublist

type Relation string

func Sublist(a []int, b []int) Relation {
	if len(a) == len(b) && equal(a, b) {
		return "equal"
	} else if isSublist(a, b) {
		return "sublist"
	} else if isSublist(b, a) {
		return "superlist"
	} else {
		return "unequal"
	}
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
		if equal(a, b[i:i+len(a)]) {
			return true
		}
	}
	return false
}

// equal checks if two slices are equal
func equal(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}