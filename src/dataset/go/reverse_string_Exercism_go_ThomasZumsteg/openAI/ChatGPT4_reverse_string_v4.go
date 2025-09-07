package reverse

func String(s string) string {
	n := len(s)
	if n <= 1 {
		return s
	}
	runes := make([]rune, n)
	for i, r := range s {
		runes[n-i-1] = r
	}
	return string(runes)
}