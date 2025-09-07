package atbash

import "strings"

func CalculateCipher(char rune) rune {
	return 'z' - char + 'a'
}

func Atbash(s string) string {
	if len(s) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(s) + len(s)/5) // Pre-allocate capacity
	
	count := 0
	
	for _, char := range s {
		if char >= 'A' && char <= 'Z' {
			char += 32 // Convert to lowercase
		}
		
		if (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') {
			if count == 5 {
				result.WriteByte(' ')
				count = 0
			}
			
			if char >= 'a' && char <= 'z' {
				result.WriteRune(CalculateCipher(char))
			} else {
				result.WriteRune(char)
			}
			count++
		}
	}
	
	return result.String()
}