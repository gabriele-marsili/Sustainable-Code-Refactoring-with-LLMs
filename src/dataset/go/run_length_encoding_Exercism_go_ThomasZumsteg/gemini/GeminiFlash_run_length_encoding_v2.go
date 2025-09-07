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
	count := 1

	for i := 1; i < len(input); i++ {
		char := rune(input[i])
		if char == last {
			count++
		} else {
			if count > 1 {
				sb.WriteString(strconv.Itoa(count))
			}
			sb.WriteRune(last)
			last = char
			count = 1
		}
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

	for i := 0; i < len(input); i++ {
		char := rune(input[i])
		if char >= '0' && char <= '9' {
			digit := int(char - '0')
			count = count*10 + digit
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