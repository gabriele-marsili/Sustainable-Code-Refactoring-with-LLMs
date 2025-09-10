package transpose

import (
	"strings"
)

func Transpose(input []string) []string {
	if len(input) == 0 {
		return []string{}
	}

	maxLen := 0
	for _, s := range input {
		if len(s) > maxLen {
			maxLen = len(s)
		}
	}

	result := make([]string, maxLen)
	for i := 0; i < maxLen; i++ {
		var sb strings.Builder
		for j := 0; j < len(input); j++ {
			if i < len(input[j]) {
				sb.WriteByte(input[j][i])
			} else {
				sb.WriteByte(' ')
			}
		}
		result[i] = sb.String()
	}
	return result
}