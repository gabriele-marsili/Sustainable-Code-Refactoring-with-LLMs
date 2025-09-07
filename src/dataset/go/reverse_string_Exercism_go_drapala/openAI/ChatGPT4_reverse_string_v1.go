package reverse

import "unicode/utf8"

func Reverse(input string) string {
	// Convert input to a slice of runes directly
	runes := []rune(input)
	// Reverse the slice in place
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	// Convert back to string and return
	return string(runes)
}