package atbash

import (
	"strings"
)

func Atbash(plainText string) string {
	if len(plainText) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(plainText) + len(plainText)/5)
	
	for _, char := range plainText {
		if shifted := encode(char); shifted != ' ' {
			result.WriteRune(shifted)
			if (result.Len()+1)%6 == 0 {
				result.WriteRune(' ')
			}
		}
	}
	
	s := result.String()
	if len(s) > 0 && s[len(s)-1] == ' ' {
		return s[:len(s)-1]
	}
	return s
}

func encode(char rune) rune {
	switch {
	case 'a' <= char && char <= 'z':
		return 'z' - char + 'a'
	case 'A' <= char && char <= 'Z':
		return 'z' - (char - 'A') + 'a'
	case '0' <= char && char <= '9':
		return char
	default:
		return ' '
	}
}