package atbash

import "strings"

func CalculateCipher(char rune) rune {
	return rune('z' - char + 'a')
}

func Atbash(s string) string {
	if len(s) == 0 {
		return ""
	}
	
	var builder strings.Builder
	builder.Grow(len(s) + len(s)/5)
	
	count := 0
	
	for _, char := range s {
		var processedChar rune
		
		if char >= 'A' && char <= 'Z' {
			processedChar = CalculateCipher(char + 32)
		} else if char >= 'a' && char <= 'z' {
			processedChar = CalculateCipher(char)
		} else if char >= '0' && char <= '9' {
			processedChar = char
		} else {
			continue
		}
		
		if count == 5 {
			builder.WriteByte(' ')
			count = 0
		}
		
		builder.WriteRune(processedChar)
		count++
	}
	
	return builder.String()
}