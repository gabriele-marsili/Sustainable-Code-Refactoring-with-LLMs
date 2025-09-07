package encode

import (
	"strconv"
	"strings"
	"unicode"
)

func RunLengthEncode(input string) (encoded string) {
	if input == "" {
		return input
	}
	
	var builder strings.Builder
	builder.Grow(len(input)) // Pre-allocate capacity
	
	runes := []rune(input)
	if len(runes) == 0 {
		return ""
	}
	
	prevChar := runes[0]
	count := 1
	
	for i := 1; i < len(runes); i++ {
		if runes[i] == prevChar {
			count++
		} else {
			encodeSegmentToBuilder(&builder, prevChar, count)
			prevChar = runes[i]
			count = 1
		}
	}
	encodeSegmentToBuilder(&builder, prevChar, count)
	return builder.String()
}

func encodeSegmentToBuilder(builder *strings.Builder, char rune, occurences int) {
	if occurences == 1 {
		builder.WriteRune(char)
	} else {
		builder.WriteString(strconv.Itoa(occurences))
		builder.WriteRune(char)
	}
}

func RunLengthDecode(input string) (decoded string) {
	if input == "" {
		return input
	}
	
	var builder strings.Builder
	builder.Grow(len(input) * 2) // Estimate capacity
	
	runes := []rune(input)
	for i := 0; i < len(runes); i++ {
		if unicode.IsLetter(runes[i]) || unicode.IsSpace(runes[i]) {
			builder.WriteRune(runes[i])
		} else if unicode.IsDigit(runes[i]) {
			occurences, digitLen := getOccurences(runes, i)
			character := runes[i+digitLen]
			decodeSegmentToBuilder(&builder, character, occurences)
			i += digitLen
		}
	}
	return builder.String()
}

func decodeSegmentToBuilder(builder *strings.Builder, character rune, occurences int) {
	for i := 0; i < occurences; i++ {
		builder.WriteRune(character)
	}
}

func getOccurences(runes []rune, startIndex int) (occurences int, digitLen int) {
	endIndex := startIndex
	for endIndex < len(runes) && unicode.IsNumber(runes[endIndex]) {
		endIndex++
	}
	digitLen = endIndex - startIndex
	occurences, err := strconv.Atoi(string(runes[startIndex:endIndex]))
	if err != nil {
		panic(err)
	}
	return occurences, digitLen
}