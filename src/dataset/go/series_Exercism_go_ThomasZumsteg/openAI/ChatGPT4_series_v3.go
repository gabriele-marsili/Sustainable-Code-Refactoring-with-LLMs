package slice

func All(n int, s string) []string {
	if n <= 0 || n > len(s) {
		return []string{}
	}
	slices := make([]string, len(s)-n+1)
	for i := 0; i <= len(s)-n; i++ {
		slices[i] = s[i : i+n]
	}
	return slices
}

func Frist(n int, s string) string {
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