package reverse

// Reverse returns a string with characters in reversed order.
func Reverse(s string) string {
	if len(s) <= 1 {
		return s
	}
	
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	
	return string(runes)
}