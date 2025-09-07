package atbash

import "unicode"

func CalculateCipher(char rune) rune {
	return 'z' - char + 'a'
}

func Atbash(s string) string {
	if len(s) == 0 {
		return ""
	}
	
	validChars := make([]rune, 0, len(s))
	
	for _, char := range s {
		lower := unicode.ToLower(char)
		if (lower >= 'a' && lower <= 'z') || (lower >= '0' && lower <= '9') {
			if lower >= 'a' && lower <= 'z' {
				validChars = append(validChars, CalculateCipher(lower))
			} else {
				validChars = append(validChars, lower)
			}
		}
	}
	
	if len(validChars) == 0 {
		return ""
	}
	
	outputLen := len(validChars) + (len(validChars)-1)/5
	output := make([]rune, 0, outputLen)
	
	for i, char := range validChars {
		if i > 0 && i%5 == 0 {
			output = append(output, ' ')
		}
		output = append(output, char)
	}
	
	return string(output)
}