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
	}
	return len(text) - 1
}

func RLEResultAppend(input byte, count int) string {
	if count == 1 {
		return string(input)
	}
	return strconv.Itoa(count) + string(input)
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

func RLDResultAppend(count int, letter byte) string {
	return strings.Repeat(string(letter), count)
}

func RunLengthEncode(input string) string {
	var result strings.Builder
	for i := 0; i < len(input); {
		localIndex := findSeqEnd(input[i:], input[i])
		count := localIndex + 1
		result.WriteString(RLEResultAppend(input[i], count))
		i += count
	}
	return result.String()
}

func RunLengthDecode(input string) string {
	var result strings.Builder
	for i := 0; i < len(input); {
		if input[i] >= '0' && input[i] <= '9' {
			count, localIndex := findNumEnd(input[i:])
			i += localIndex
			result.WriteString(RLDResultAppend(count, input[i]))
		} else {
			result.WriteByte(input[i])
		}
		i++
	}
	return result.String()
}