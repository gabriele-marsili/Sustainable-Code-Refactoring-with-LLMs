package sublist

type Relation string

func Sublist(a []int, b []int) Relation {
	switch {
	case len(a) == len(b) && equal(a, b):
		return "equal"
	case len(a) < len(b) && isSublist(a, b):
		return "sublist"
	case len(a) > len(b) && isSublist(b, a):
		return "superlist"
	default:
		return "unequal"
	}
}

// isSublist returns true if a is a sublist of b
func isSublist(a []int, b []int) bool {
	if len(a) == 0 {
		return true
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