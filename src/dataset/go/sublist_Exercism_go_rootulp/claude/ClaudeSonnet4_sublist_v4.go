package sublist

type Relation string

func Sublist(a []int, b []int) Relation {
	if len(a) == len(b) {
		if slicesEqual(a, b) {
			return "equal"
		}
		return "unequal"
	}
	
	if len(a) == 0 {
		return "sublist"
	}
	
	if len(b) == 0 {
		return "superlist"
	}
	
	if len(a) < len(b) {
		if isSublist(a, b) {
			return "sublist"
		}
	} else {
		if isSublist(b, a) {
			return "superlist"
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

func isSublist(a []int, b []int) bool {
	if len(a) == 0 {
		return true
	}
	
	for i := 0; i <= len(b)-len(a); i++ {
		if b[i] == a[0] {
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
	}
	return false
}