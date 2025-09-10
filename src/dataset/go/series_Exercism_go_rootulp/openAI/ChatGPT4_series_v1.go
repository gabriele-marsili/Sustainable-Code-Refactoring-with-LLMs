package series

func All(n int, s string) []string {
	if n > len(s) || n <= 0 {
		return nil
	}
	result := make([]string, 0, len(s)-n+1)
	for i := 0; i+n <= len(s); i++ {
		result = append(result, s[i:i+n])
	}
	return result
}

func UnsafeFirst(n int, s string) string {
	if n > len(s) || n <= 0 {
		return ""
	}
	return s[:n]
}

func First(n int, s string) (string, bool) {
	if n > len(s) || n <= 0 {
		return "", false
	}
	return s[:n], true
}