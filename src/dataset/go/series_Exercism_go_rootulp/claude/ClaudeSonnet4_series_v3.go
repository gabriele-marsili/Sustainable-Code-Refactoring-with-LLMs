package series

func All(n int, s string) (result []string) {
	if n <= 0 || n > len(s) {
		return nil
	}
	
	capacity := len(s) - n + 1
	result = make([]string, 0, capacity)
	
	for i := 0; i <= len(s)-n; i++ {
		result = append(result, s[i:i+n])
	}
	return result
}

func UnsafeFirst(n int, s string) string {
	return s[:n]
}

func First(n int, s string) (first string, ok bool) {
	if n > len(s) || n < 0 {
		return "", false
	}
	return s[:n], true
}