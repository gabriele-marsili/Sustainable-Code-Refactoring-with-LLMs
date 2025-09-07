package atbash

import (
	"strings"
	"unicode"
)

func Atbash(message string) (ciphertext string) {
	var builder strings.Builder
	builder.Grow(len(message))
	
	for _, r := range strings.ToLower(message) {
		if unicode.IsDigit(r) {
			builder.WriteRune(r)
		} else if unicode.IsLetter(r) {
			builder.WriteRune('z' - r + 'a')
		}
	}
	
	result := builder.String()
	if len(result) == 0 {
		return ""
	}
	
	var output strings.Builder
	output.Grow(len(result) + len(result)/5)
	
	for i, r := range result {
		if i > 0 && i%5 == 0 {
			output.WriteByte(' ')
		}
		output.WriteRune(r)
	}
	
	return output.String()
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
	
	numGroups := (len(message) + n - 1) / n
	groups = make([]string, 0, numGroups)
	
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
		return 'z' - r + 'a'
	}
	return r
}