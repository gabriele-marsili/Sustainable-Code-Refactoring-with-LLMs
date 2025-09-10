package sublist

type Relation string

func Sublist(a []int, b []int) Relation {
	lenA := len(a)
	lenB := len(b)

	if lenA == 0 && lenB == 0 {
		return "equal"
	}

	if lenA == lenB {
		if equal(a, b) {
			return "equal"
		}
	} else if lenA < lenB {
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

func equal(a []int, b []int) bool {
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func isSublist(a []int, b []int) bool {
	lenA := len(a)
	lenB := len(b)

	if lenA == 0 {
		return true
	}

	if lenB == 0 {
		return false
	}

	for i := 0; i <= lenB-lenA; i++ {
		if b[i] == a[0] {
			match := true
			for j := 1; j < lenA; j++ {
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