package encode

import (
	"strconv"
	"strings"
	"unicode"
)

func RunLengthEncode(input string) string {
	if input == "" {
		return ""
	}

	var sb strings.Builder
	var prevChar rune
	prevOccurrences := 0

	for _, char := range input {
		if char == prevChar {
			prevOccurrences++
		} else {
			if prevChar != 0 {
				if prevOccurrences == 1 {
					sb.WriteRune(prevChar)
				} else {
					sb.WriteString(strconv.Itoa(prevOccurrences))
					sb.WriteRune(prevChar)
				}
			}
			prevChar = char
			prevOccurrences = 1
		}
	}

	// Handle the last segment
	if prevOccurrences == 1 {
		sb.WriteRune(prevChar)
	} else {
		sb.WriteString(strconv.Itoa(prevOccurrences))
		sb.WriteRune(prevChar)
	}

	return sb.String()
}

func RunLengthDecode(input string) string {
	var sb strings.Builder
	var numStr strings.Builder

	for _, r := range input {
		if unicode.IsDigit(r) {
			numStr.WriteRune(r)
		} else {
			count := 1
			if numStr.Len() > 0 {
				count, _ = strconv.Atoi(numStr.String())
				numStr.Reset()
			}
			for i := 0; i < count; i++ {
				sb.WriteRune(r)
			}
		}
	}

	return sb.String()
}