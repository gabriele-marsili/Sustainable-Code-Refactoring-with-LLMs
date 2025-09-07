package reverse

import "unicode/utf8"

// https://go.dev/blog/strings
func Reverse(input string) string {
	if len(input) == 0 {
		return input
	}
	
	// Count runes first to pre-allocate slice
	runeCount := utf8.RuneCountInString(input)
	if runeCount <= 1 {
		return input
	}
	
	// Pre-allocate slice with exact capacity
	store := make([]rune, 0, runeCount)
	for _, r := range input {
		store = append(store, r)
	}
	
	// Reverse in-place
	for i, j := 0, len(store)-1; i < j; i, j = i+1, j-1 {
		store[i], store[j] = store[j], store[i]
	}
	
	return string(store)
}