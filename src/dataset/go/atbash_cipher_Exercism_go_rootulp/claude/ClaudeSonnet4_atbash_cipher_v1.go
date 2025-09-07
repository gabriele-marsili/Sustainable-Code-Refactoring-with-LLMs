package atbash

import (
	"strings"
	"unicode"
)

func Atbash(message string) (ciphertext string) {
	var builder strings.Builder
	builder.Grow(len(message)) // Pre-allocate capacity
	
	for _, r := range strings.ToLower(message) {
		if unicode.IsDigit(r) {
			builder.WriteRune(r)
		} else if unicode.IsLetter(r) {
			// Direct calculation instead of map lookup
			builder.WriteRune('z' - (r - 'a'))
		}
	}
	
	encoded := builder.String()
	if len(encoded) == 0 {
		return ""
	}
	
	// Calculate final size with spaces
	groups := (len(encoded) + 4) / 5
	finalSize := len(encoded) + groups - 1
	
	var result strings.Builder
	result.Grow(finalSize)
	
	for i, r := range encoded {
		if i > 0 && i%5 == 0 {
			result.WriteByte(' ')
		}
		result.WriteRune(r)
	}
	
	return result.String()
}

func removeNonAlphanumeric(s string) (result string) {
	var builder strings.Builder
	builder.Grow(len(s))
	
	for _, r := range s {
		if unicode.IsDigit(r) || unicode.IsLetter(r) {
			builder.WriteRune(r)
		}
	}
	return builder.String()
}

func splitEveryN(message string, n int) (groups []string) {
	if len(message) == 0 {
		return nil
	}
	
	groupCount := (len(message) + n - 1) / n
	groups = make([]string, 0, groupCount)
	
	for i := 0; i < len(message); i += n {
		end := i + n
		if end > len(message) {
			end = len(message)
		}
		groups = append(groups, message[i:end])
	}
	return groups
}

func encode(r rune) rune {
	if unicode.IsLetter(r) {
		return 'z' - (r - 'a')
	}
	return r
}