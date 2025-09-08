package railfence

import (
	"unicode/utf8"
)

const (
	Down = iota
	Up
)

func Encode(message string, numRails int) string {
	if numRails <= 1 || len(message) <= 1 {
		return message
	}

	rails := make([][]rune, numRails)
	railIndex, direction := 0, Down

	for _, c := range message {
		rails[railIndex] = append(rails[railIndex], c)
		if railIndex == 0 {
			direction = Down
		} else if railIndex == numRails-1 {
			direction = Up
		}
		if direction == Down {
			railIndex++
		} else {
			railIndex--
		}
	}

	var encoded []rune
	for _, rail := range rails {
		encoded = append(encoded, rail...)
	}
	return string(encoded)
}

func Decode(message string, numRails int) string {
	if numRails <= 1 || len(message) <= 1 {
		return message
	}

	railLengths := make([]int, numRails)
	railIndex, direction := 0, Down

	for range message {
		railLengths[railIndex]++
		if railIndex == 0 {
			direction = Down
		} else if railIndex == numRails-1 {
			direction = Up
		}
		if direction == Down {
			railIndex++
		} else {
			railIndex--
		}
	}

	rails := make([][]rune, numRails)
	pos := 0
	for i, length := range railLengths {
		rails[i] = []rune(message[pos : pos+length])
		pos += length
	}

	var decoded []rune
	railIndex, direction = 0, Down

	for range message {
		decoded = append(decoded, rails[railIndex][0])
		rails[railIndex] = rails[railIndex][1:]
		if railIndex == 0 {
			direction = Down
		} else if railIndex == numRails-1 {
			direction = Up
		}
		if direction == Down {
			railIndex++
		} else {
			railIndex--
		}
	}

	return string(decoded)
}