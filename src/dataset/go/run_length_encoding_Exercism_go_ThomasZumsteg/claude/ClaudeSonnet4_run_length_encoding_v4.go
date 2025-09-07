package encode

import (
	"strconv"
	"strings"
)

func RunLengthEncode(input string) (result string) {
	if input == "" {
		return
	}
	
	var builder strings.Builder
	builder.Grow(len(input))
	
	last := rune(input[0])
	count := 1
	
	for _, char := range input[1:] {
		if char == last {
			count++
		} else {
			if count > 1 {
				builder.WriteString(strconv.Itoa(count))
			}
			builder.WriteRune(last)
			count = 1
			last = char
		}
	}
	
	if count > 1 {
		builder.WriteString(strconv.Itoa(count))
	}
	builder.WriteRune(last)
	
	return builder.String()
}

func RunLengthDecode(input string) (result string) {
	if input == "" {
		return
	}
	
	var builder strings.Builder
	builder.Grow(len(input) * 2)
	
	count := 0
	for _, char := range input {
		if char >= '0' && char <= '9' {
			count = count*10 + int(char-'0')
		} else {
			if count == 0 {
				count = 1
			}
			for c := 0; c < count; c++ {
				builder.WriteRune(char)
			}
			count = 0
		}
	}
	
	return builder.String()
}