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
			if prevOccurrences == 1 {
				sb.WriteRune(prevChar)
			} else {
				sb.WriteString(strconv.Itoa(prevOccurrences))
				sb.WriteRune(prevChar)
			}
			prevChar = char
			prevOccurrences = 1
		}
	}

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
	runes := []rune(input)
	i := 0
	for i < len(runes) {
		if !unicode.IsDigit(runes[i]) {
			sb.WriteRune(runes[i])
			i++
		} else {
			j := i
			for j < len(runes) && unicode.IsDigit(runes[j]) {
				j++
			}
			countStr := string(runes[i:j])
			count, _ := strconv.Atoi(countStr)
			char := runes[j]
			for k := 0; k < count; k++ {
				sb.WriteRune(char)
			}
			i = j + 1
		}
	}
	return sb.String()
}