package series

func All(n int, s string) []string {
	if n > len(s) || n <= 0 {
		return []string{}
	}
	
	resultLen := len(s) - n + 1
	result := make([]string, resultLen)
	
	for i := 0; i < resultLen; i++ {
		result[i] = s[i : i+n]
	}
	return result
}

func UnsafeFirst(n int, s string) string {
	return s[:n]
}

func First(n int, s string) (first string, ok bool) {
	if n > len(s) || n <= 0 {
		return "", false
	}
	return s[:n], true
}