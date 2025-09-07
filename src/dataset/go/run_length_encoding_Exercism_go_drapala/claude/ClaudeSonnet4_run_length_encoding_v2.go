package encode

import (
	"strconv"
	"strings"
)

func findSeqEnd(text string, letter byte) int {
	for j := 1; j < len(text); j++ {
		if text[j] != letter {
			return j - 1
		}
	}
	return len(text) - 1
}

func RLEResultAppend(input byte, count int, result *strings.Builder) {
	if count > 1 {
		result.WriteString(strconv.Itoa(count))
	}
	result.WriteByte(input)
}

func findNumEnd(text string) (int, int) {
	for j := 0; j < len(text); j++ {
		if text[j] < '0' || text[j] > '9' {
			number, _ := strconv.Atoi(text[:j])
			return number, j
		}
	}
	return -1, -1
}

func RLDResultAppend(count int, letter byte, result *strings.Builder) {
	for i := 0; i < count; i++ {
		result.WriteByte(letter)
	}
}

func RunLengthEncode(input string) string {
	if len(input) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(input))
	
	for i := 0; i < len(input); {
		currentChar := input[i]
		seqEnd := findSeqEnd(input[i:], currentChar)
		count := seqEnd + 1
		
		RLEResultAppend(currentChar, count, &result)
		i += count
	}
	return result.String()
}

func RunLengthDecode(input string) string {
	if len(input) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(input) * 2)
	
	for i := 0; i < len(input); {
		if input[i] >= '0' && input[i] <= '9' {
			count, offset := findNumEnd(input[i:])
			i += offset
			RLDResultAppend(count, input[i], &result)
			i++
		} else {
			RLDResultAppend(1, input[i], &result)
			i++
		}
	}
	return result.String()
}