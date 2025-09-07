package encode

import (
	"strconv"
	"unicode"
	"strings"
)

func RunLengthEncode(input string) (encoded string) {
	if input == "" {
		return input
	}
	var sb strings.Builder
	prevChar := rune(input[0])
	prevOccurences := 1

	for _, char := range input[1:] {
		if char == prevChar {
			prevOccurences++
		} else {
			sb.WriteString(encodeSegment(prevChar, prevOccurences))
			prevChar = char
			prevOccurences = 1
		}
	}
	sb.WriteString(encodeSegment(prevChar, prevOccurences))
	return sb.String()
}

func encodeSegment(char rune, occurences int) string {
	if occurences == 1 {
		return string(char)
	}
	return strconv.Itoa(occurences) + string(char)
}

func RunLengthDecode(input string) (decoded string) {
	var sb strings.Builder
	runes := []rune(input)
	length := len(runes)

	for i := 0; i < length; {
		if unicode.IsLetter(runes[i]) || unicode.IsSpace(runes[i]) {
			sb.WriteRune(runes[i])
			i++
		} else if unicode.IsDigit(runes[i]) {
			startIndex := i
			for i < length && unicode.IsDigit(runes[i]) {
				i++
			}
			occurences, _ := strconv.Atoi(string(runes[startIndex:i]))
			character := runes[i]
			sb.WriteString(strings.Repeat(string(character), occurences))
			i++
		}
	}
	return sb.String()
}