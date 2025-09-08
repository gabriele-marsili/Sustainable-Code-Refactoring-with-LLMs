package railfence

import (
	"strings"
	"unicode/utf8"
)

const (
	Down = "down"
	Up   = "up"
)

func Encode(message string, numRails int) string {
	if numRails <= 1 {
		return message
	}

	rails := make([]strings.Builder, numRails)
	railIndex := 0
	direction := 1 // 1 for down, -1 for up

	for _, c := range message {
		rails[railIndex].WriteRune(c)
		railIndex += direction

		if railIndex >= numRails {
			railIndex = numRails - 2
			direction = -1
		} else if railIndex < 0 {
			railIndex = 1
			direction = 1
		}
	}

	var encoded strings.Builder
	for i := 0; i < numRails; i++ {
		encoded.WriteString(rails[i].String())
	}
	return encoded.String()
}

func Decode(message string, numRails int) string {
	if numRails <= 1 {
		return message
	}

	railLengths := make([]int, numRails)
	railIndex := 0
	direction := 1

	for i := 0; i < len(message); i++ {
		railLengths[railIndex]++
		railIndex += direction

		if railIndex >= numRails {
			railIndex = numRails - 2
			direction = -1
		} else if railIndex < 0 {
			railIndex = 1
			direction = 1
		}
	}

	rails := make([]string, numRails)
	start := 0
	for i := 0; i < numRails; i++ {
		rails[i] = message[start : start+railLengths[i]]
		start += railLengths[i]
	}

	decoded := make([]rune, len(message))
	msgIndex := 0
	railIndex = 0
	direction = 1

	for i := 0; i < len(message); i++ {
		r, size := utf8.DecodeRuneInString(rails[railIndex])
		decoded[i] = r
		rails[railIndex] = rails[railIndex][size:]

		railIndex += direction
		if railIndex >= numRails {
			railIndex = numRails - 2
			direction = -1
		} else if railIndex < 0 {
			railIndex = 1
			direction = 1
		}
		msgIndex++
	}

	return string(decoded)
}