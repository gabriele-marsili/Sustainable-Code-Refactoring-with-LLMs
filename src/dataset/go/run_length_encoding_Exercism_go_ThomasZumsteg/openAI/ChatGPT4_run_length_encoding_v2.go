package encode

import (
	"strconv"
	"strings"
)

func RunLengthEncode(input string) string {
	if input == "" {
		return ""
	}

	var sb strings.Builder
	last := rune(input[0])
	count := 0

	for _, char := range input {
		if char == last {
			count++
		} else {
			if count > 1 {
				sb.WriteString(strconv.Itoa(count))
			}
			sb.WriteRune(last)
			count = 1
		}
		last = char
	}

	if count > 1 {
		sb.WriteString(strconv.Itoa(count))
	}
	sb.WriteRune(last)

	return sb.String()
}

func RunLengthDecode(input string) string {
	var sb strings.Builder
	count := 0

	for _, char := range input {
		if d, err := strconv.Atoi(string(char)); err == nil {
			count = count*10 + d
		} else {
			if count == 0 {
				count = 1
			}
			sb.WriteString(strings.Repeat(string(char), count))
			count = 0
		}
	}

	return sb.String()
}