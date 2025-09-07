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
	
	runes := []rune(input)
	last := runes[0]
	count := 1
	
	for i := 1; i < len(runes); i++ {
		if runes[i] == last {
			count++
		} else {
			if count > 1 {
				builder.WriteString(strconv.Itoa(count))
			}
			builder.WriteRune(last)
			last = runes[i]
			count = 1
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
	
	runes := []rune(input)
	count := 0
	
	for _, char := range runes {
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