package encode

import (
	"strconv"
	"strings"
)

func findSeqEnd(text string, letterOfInterest string) int {
	letter := letterOfInterest[0]
	for j := 0; j < len(text); j++ {
		if text[j] != letter {
			return j - 1
		}
		if j == len(text)-1 {
			return j
		}
	}
	return -1
}

func RLEResultAppend(input string, count int) string {
	if count == 1 {
		return input
	}
	return strconv.Itoa(count) + input
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

func RLDResultAppend(count int, letter string) string {
	return strings.Repeat(letter, count)
}

func RunLengthEncode(input string) string {
	if len(input) == 0 {
		return ""
	}
	
	var result strings.Builder
	result.Grow(len(input))
	
	for i := 0; i < len(input); {
		currentChar := input[i]
		count := 1
		
		for i+count < len(input) && input[i+count] == currentChar {
			count++
		}
		
		if count > 1 {
			result.WriteString(strconv.Itoa(count))
		}
		result.WriteByte(currentChar)
		
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
			count, local_index := findNumEnd(input[i:])
			i += local_index
			result.WriteString(strings.Repeat(string(input[i]), count))
			i++
		} else {
			result.WriteByte(input[i])
			i++
		}
	}
	
	return result.String()
}