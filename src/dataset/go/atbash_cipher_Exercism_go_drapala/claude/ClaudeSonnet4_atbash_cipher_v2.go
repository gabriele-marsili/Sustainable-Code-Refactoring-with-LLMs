package atbash

import "strings"

func Atbash(s string) string {
	var result strings.Builder
	result.Grow(len(s) + len(s)/5) // Pre-allocate capacity
	
	count := 0
	
	for _, char := range s {
		var processedChar rune
		
		// Check and process alphabets
		if char >= 'A' && char <= 'Z' {
			processedChar = rune('z' - (char - 'A'))
		} else if char >= 'a' && char <= 'z' {
			processedChar = rune('z' - (char - 'a'))
		} else if char >= '0' && char <= '9' {
			processedChar = char
		} else {
			continue // Skip non-alphanumeric characters
		}
		
		// Group by 5
		if count == 5 {
			result.WriteRune(' ')
			count = 0
		}
		
		result.WriteRune(processedChar)
		count++
	}
	
	return result.String()
}