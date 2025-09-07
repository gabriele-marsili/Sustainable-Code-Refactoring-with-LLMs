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
	count := 1

	for _, char := range input[1:] {
		if char == prevChar {
			count++
		} else {
			appendEncodedSegment(&sb, prevChar, count)
			prevChar = char
			count = 1
		}
	}
	appendEncodedSegment(&sb, prevChar, count)
	return sb.String()
}

func appendEncodedSegment(sb *strings.Builder, char rune, count int) {
	if count == 1 {
		sb.WriteRune(char)
	} else {
		sb.WriteString(strconv.Itoa(count))
		sb.WriteRune(char)
	}
}

func RunLengthDecode(input string) string {
	var sb strings.Builder
	runes := []rune(input)
	length := len(runes)
	i := 0

	for i < length {
		if unicode.IsLetter(runes[i]) || unicode.IsSpace(runes[i]) {
			sb.WriteRune(runes[i])
			i++
		} else {
			start := i
			for i < length && unicode.IsDigit(runes[i]) {
				i++
			}
			count, _ := strconv.Atoi(string(runes[start:i]))
			char := runes[i]
			sb.WriteString(strings.Repeat(string(char), count))
			i++
		}
	}
	return sb.String()
}