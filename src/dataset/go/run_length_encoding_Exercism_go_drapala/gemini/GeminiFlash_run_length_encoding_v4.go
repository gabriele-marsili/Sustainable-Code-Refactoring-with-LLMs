package encode

import (
	"strconv"
	"strings"
)

func findSeqEnd(text string, letterOfInterest byte) int {
	for j := 0; j < len(text); j++ {
		if text[j] != letterOfInterest {
			return j - 1
		}
		if j == len(text)-1 {
			return j
		}
	}
	return -1
}

func RLEResultAppend(input byte, count int) string {
	var result strings.Builder
	if count != 1 {
		result.WriteString(strconv.Itoa(count))
	}
	result.WriteByte(input)
	return result.String()
}

func findNumEnd(text string) (int, int) {
	for j := 0; j < len(text); j++ {
		if text[j] < '0' || text[j] > '9' {
			number, err := strconv.Atoi(text[:j])
			if err != nil {
				return -1, -1 // Handle error appropriately
			}
			return number, j
		}
	}
	number, err := strconv.Atoi(text)
	if err != nil {
		return -1, -1 // Handle error appropriately
	}
	return number, len(text)
}

func RLDResultAppend(count int, letter byte) string {
	var result strings.Builder
	result.Grow(count)
	for i := 0; i < count; i++ {
		result.WriteByte(letter)
	}
	return result.String()
}

func RunLengthEncode(input string) string {
	var result strings.Builder
	for i := 0; i < len(input); {
		local_index := findSeqEnd(input[i:], input[i])
		global_index := i + local_index
		result.WriteString(RLEResultAppend(input[i], local_index+1))
		i = global_index + 1
	}
	return result.String()
}

func RunLengthDecode(input string) string {
	var result strings.Builder
	for i := 0; i < len(input); {
		if input[i] >= '0' && input[i] <= '9' {
			count, local_index := findNumEnd(input[i:])
			i += local_index
			result.WriteString(RLDResultAppend(count, input[i]))
			i++
		} else {
			result.WriteString(RLDResultAppend(1, input[i]))
			i++
		}
	}
	return result.String()
}