package series

func All(n int, s string) []string {
	if n > len(s) || n <= 0 {
		return []string{}
	}
	
	length := len(s) - n + 1
	result := make([]string, length)
	
	for i := 0; i < length; i++ {
		result[i] = s[i : i+n]
	}
	return result
}

func UnsafeFirst(n int, s string) string {
	return s[0:n]
}

func First(n int, s string) (first string, ok bool) {
	if n > len(s) || n <= 0 {
		return "", false
	}
	return s[0:n], true
}