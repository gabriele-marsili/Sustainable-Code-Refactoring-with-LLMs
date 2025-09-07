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
	prevChar := rune(input[0])
	prevOccurrences := 1

	for _, char := range input[1:] {
		if char == prevChar {
			prevOccurrences++
		} else {
			appendEncodedSegment(&sb, prevChar, prevOccurrences)
			prevChar = char
			prevOccurrences = 1
		}
	}
	appendEncodedSegment(&sb, prevChar, prevOccurrences)
	return sb.String()
}

func appendEncodedSegment(sb *strings.Builder, char rune, occurrences int) {
	if occurrences == 1 {
		sb.WriteRune(char)
	} else {
		sb.WriteString(strconv.Itoa(occurrences))
		sb.WriteRune(char)
	}
}

func RunLengthDecode(input string) string {
	var sb strings.Builder
	runes := []rune(input)
	length := len(runes)

	for i := 0; i < length; {
		if unicode.IsLetter(runes[i]) || unicode.IsSpace(runes[i]) {
			sb.WriteRune(runes[i])
			i++
		} else if unicode.IsDigit(runes[i]) {
			start := i
			for i < length && unicode.IsDigit(runes[i]) {
				i++
			}
			occurrences, _ := strconv.Atoi(string(runes[start:i]))
			if i < length {
				sb.WriteString(strings.Repeat(string(runes[i]), occurrences))
				i++
			}
		}
	}
	return sb.String()
}