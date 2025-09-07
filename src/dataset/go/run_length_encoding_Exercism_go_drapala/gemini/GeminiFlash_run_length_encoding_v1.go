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
		if text[j] < '0' || text[j] > '9' {
			number, err := strconv.Atoi(text[:j])
			if err != nil {
				return -1, -1 // Handle error appropriately, maybe return an error
			}
			return number, j
		}
	}
	number, err := strconv.Atoi(text)
	if err != nil {
		return -1, -1
	}
	return number, len(text)
}

func RLDResultAppend(count int, letter string) string {
	var result strings.Builder
	result.Grow(count) // Pre-allocate memory
	for i := 0; i < count; i++ {
		result.WriteString(letter)
	}
	return result.String()
}

func RunLengthEncode(input string) string {
	var result strings.Builder
	for i := 0; i < len(input); {
		localIndex := findSeqEnd(input[i:], string(input[i]))
		globalIndex := i + localIndex
		result.WriteString(RLEResultAppend(string(input[i]), localIndex+1))
		i = globalIndex + 1
	}
	return result.String()
}

func RunLengthDecode(input string) string {
	var result strings.Builder
	for i := 0; i < len(input); {
		if input[i] >= '0' && input[i] <= '9' {
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