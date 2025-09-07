package encode

import (
	"strconv"
	"strings"
)

func findSeqEnd(text string, letter byte) int {
	for j := 0; j < len(text); j++ {
		if text[j] != letter {
			return j - 1
		}
	}
	return len(text) - 1
}

func RLEResultAppend(input byte, count int, builder *strings.Builder) {
	if count > 1 {
		builder.WriteString(strconv.Itoa(count))
	}
	builder.WriteByte(input)
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

func RLDResultAppend(count int, letter byte, builder *strings.Builder) {
	builder.WriteString(strings.Repeat(string(letter), count))
}

func RunLengthEncode(input string) string {
	var builder strings.Builder
	for i := 0; i < len(input); {
		localIndex := findSeqEnd(input[i:], input[i])
		count := localIndex + 1
		RLEResultAppend(input[i], count, &builder)
		i += count
	}
	return builder.String()
}

func RunLengthDecode(input string) string {
	var builder strings.Builder
	for i := 0; i < len(input); {
		if input[i] >= '0' && input[i] <= '9' {
			count, localIndex := findNumEnd(input[i:])
			i += localIndex
			RLDResultAppend(count, input[i], &builder)
		} else {
			RLDResultAppend(1, input[i], &builder)
		}
		i++
	}
	return builder.String()
}