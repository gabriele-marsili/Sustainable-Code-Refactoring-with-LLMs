package encode

import (
	"strconv"
	"strings"
)

func findSeqEnd(text string, letterOfInterest rune) int {
	for j, r := range text {
		if r != letterOfInterest {
			return j - 1
		}
		if j == len(text)-1 {
			return j
		}
	}
	return -1
}

func RLEResultAppend(input rune, count int) string {
	var result strings.Builder

	if count != 1 {
		result.WriteString(strconv.Itoa(count))
	}
	result.WriteRune(input)
	return result.String()
}

func findNumEnd(text string) (int, int) {
	var number int
	var endIndex int
	for i, r := range text {
		if r >= '0' && r <= '9' {
			continue
		} else {
			number, _ = strconv.Atoi(text[:i])
			endIndex = i
			return number, endIndex
		}
	}
	return -1, -1
}

func RLDResultAppend(count int, letter rune) string {
	var result strings.Builder
	for i := 0; i < count; i++ {
		result.WriteRune(letter)
	}
	return result.String()
}

func RunLengthEncode(input string) string {
	var result strings.Builder
	var localIndex, globalIndex int

	for i, r := range input {
		if i > globalIndex {
			i = globalIndex + 1
		}
		localIndex = findSeqEnd(input[i:], r)
		globalIndex = i + localIndex

		result.WriteString(RLEResultAppend(r, localIndex+1))
		if i == len(input)-1 {
			break
		}
		if globalIndex >= len(input)-1 {
			break
		}
	}
	return result.String()
}

func RunLengthDecode(input string) string {
	var result strings.Builder
	var count, localIndex int

	for i := 0; i < len(input); i++ {
		if input[i] >= '0' && input[i] <= '9' {
			count, localIndex = findNumEnd(input[i:])
			i += localIndex
			result.WriteString(RLDResultAppend(count, rune(input[i])))
		} else {
			result.WriteString(RLDResultAppend(1, rune(input[i])))
		}
	}
	return result.String()
}