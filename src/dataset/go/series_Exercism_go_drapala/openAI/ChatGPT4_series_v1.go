package series

func All(n int, s string) []string {
	if n > len(s) {
		return nil // Return nil for empty slice
	}
	result := make([]string, len(s)-n+1)
	for i := 0; i <= len(s)-n; i++ {
		result[i] = s[i : i+n]
	}
	return result
}

func UnsafeFirst(n int, s string) string {
	if n > len(s) {
		return "" // Handle edge case
	}
	return s[:n]
}

func First(n int, s string) (first string, ok bool) {
	if n > len(s) {
		return "", false
	}
	return s[:n], true
}