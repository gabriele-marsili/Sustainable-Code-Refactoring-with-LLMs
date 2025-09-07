package encode

import (
	"strconv"
	"strings"
	"unicode"
)

func RunLengthEncode(input string) string {
	if input == "" {
		return input
	}

	var sb strings.Builder
	var prevChar rune
	prevOccurrences := 0

	for _, char := range input {
		if prevChar == 0 {
			prevChar = char
			prevOccurrences = 1
		} else if char == prevChar {
			prevOccurrences++
		} else {
			if prevOccurrences > 1 {
				sb.WriteString(strconv.Itoa(prevOccurrences))
			}
			sb.WriteRune(prevChar)
			prevChar = char
			prevOccurrences = 1
		}
	}

	if prevOccurrences > 1 {
		sb.WriteString(strconv.Itoa(prevOccurrences))
	}
	sb.WriteRune(prevChar)

	return sb.String()
}

func RunLengthDecode(input string) string {
	var sb strings.Builder
	numBuffer := strings.Builder{}

	for _, r := range input {
		if unicode.IsDigit(r) {
			numBuffer.WriteRune(r)
		} else {
			count := 1
			if numBuffer.Len() > 0 {
				count, _ = strconv.Atoi(numBuffer.String())
				numBuffer.Reset()
			}
			for i := 0; i < count; i++ {
				sb.WriteRune(r)
			}
		}
	}
	return sb.String()
}