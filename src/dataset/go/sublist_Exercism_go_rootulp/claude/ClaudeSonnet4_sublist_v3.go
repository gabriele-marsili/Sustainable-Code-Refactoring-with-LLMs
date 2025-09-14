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

func slicesEqual(a, b []int) bool {
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func getString(slice []int) string {
	if len(slice) == 0 {
		return ""
	}
	
	var result strings.Builder
	for i, val := range slice {
		if i > 0 {
			result.WriteByte(',')
		}
		result.WriteString(strconv.Itoa(val))
	}
	return result.String()
}