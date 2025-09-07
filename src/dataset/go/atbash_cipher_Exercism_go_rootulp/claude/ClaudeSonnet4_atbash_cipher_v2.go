package atbash

import (
	"strings"
	"unicode"
)

func Atbash(message string) string {
	var builder strings.Builder
	builder.Grow(len(message)) // Pre-allocate capacity
	
	count := 0
	for _, r := range message {
		if unicode.IsDigit(r) {
			if count > 0 && count%5 == 0 {
				builder.WriteByte(' ')
			}
			builder.WriteRune(r)
			count++
		} else if unicode.IsLetter(r) {
			if count > 0 && count%5 == 0 {
				builder.WriteByte(' ')
			}
			// Convert to lowercase and apply atbash cipher inline
			if r >= 'A' && r <= 'Z' {
				r = r + 32 // Convert to lowercase
			}
			// Apply atbash cipher: a->z, b->y, etc.
			encoded := 'z' - (r - 'a')
			builder.WriteRune(encoded)
			count++
		}
	}
	
	return builder.String()
}