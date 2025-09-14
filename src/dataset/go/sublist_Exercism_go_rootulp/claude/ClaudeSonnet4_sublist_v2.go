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

func slicesEqual(a, b []int) bool {
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func isSublist(a []int, b []int) bool {
	if len(a) == 0 {
		return true
	}
	if len(a) > len(b) {
		return false
	}
	
	for i := 0; i <= len(b)-len(a); i++ {
		if slicesEqual(a, b[i:i+len(a)]) {
			return true
		}
	}
	return false
}