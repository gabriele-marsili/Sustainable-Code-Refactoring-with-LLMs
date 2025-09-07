package encode

import (
	"strconv"
	"strings"
)

func findSeqEnd(text string, letterOfInterest string) int {
	for j := 0; j < len(text); j++ {
		if text[j:j+1] != letterOfInterest {
			return j - 1
		}
		if j == len(text)-1 {
			return j
		}
	}
	return -1
}

func RLEResultAppend(input string, count int) string {
	var result strings.Builder
	if count != 1 {
		result.WriteString(strconv.Itoa(count))
	}
	result.WriteString(input)
	return result.String()
}

func findNumEnd(text string) (int, int) {
	for j := 0; j < len(text); j++ {
		if '0' > text[j] || text[j] > '9' {
			number, _ := strconv.Atoi(text[:j])
			return number, j
		}
	}
	return -1, -1
}

func RLDResultAppend(count int, letter string) string {
	var result strings.Builder
	result.Grow(count)
	for i := 0; i < count; i++ {
		result.WriteString(letter)
	}
	return result.String()
}

func RunLengthEncode(input string) string {
	var result strings.Builder
	inputLen := len(input)

	for i := 0; i < inputLen; {
		letter := input[i : i+1]
		localIndex := findSeqEnd(input[i:], letter)
		globalIndex := i + localIndex
		result.WriteString(RLEResultAppend(letter, localIndex+1))
		i = globalIndex + 1
	}
	return result.String()
}

func RunLengthDecode(input string) string {
	var result strings.Builder
	inputLen := len(input)

	for i := 0; i < inputLen; {
		if '0' <= input[i] && input[i] <= '9' {
			count, localIndex := findNumEnd(input[i:])
			i += localIndex
			result.WriteString(RLDResultAppend(count, string(input[i])))
			i++
		} else {
			result.WriteString(RLDResultAppend(1, string(input[i])))
			i++
		}
	}
	return result.String()
}