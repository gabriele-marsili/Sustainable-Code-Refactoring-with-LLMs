package rotationalcipher

import "strings"

func RotationalCipher(plain string, shiftKey int) string {
	if len(plain) == 0 {
		return plain
	}
	
	shiftKey = ((shiftKey % 26) + 26) % 26
	if shiftKey == 0 {
		return plain
	}
	
	var builder strings.Builder
	builder.Grow(len(plain))
	
	for _, c := range plain {
		if c >= 'a' && c <= 'z' {
			shifted := 'a' + (c-'a'+rune(shiftKey))%26
			builder.WriteRune(shifted)
		} else if c >= 'A' && c <= 'Z' {
			shifted := 'A' + (c-'A'+rune(shiftKey))%26
			builder.WriteRune(shifted)
		} else {
			builder.WriteRune(c)
		}
	}
	
	return builder.String()
}