package sublist

type Relation string

func Sublist(a []int, b []int) Relation {
	switch {
	case len(a) == len(b) && equal(a, b):
		return "equal"
	case isSublist(a, b):
		return "sublist"
	case isSublist(b, a):
		return "superlist"
	default:
		return "unequal"
	}
}

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