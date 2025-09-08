package railfence

import (
	"fmt"
	"unicode/utf8"
)

const (
	Down = iota
	Up
)

func Encode(message string, numRails int) (encoded string) {
	rails := encodeRails(message, numRails)
	for _, rail := range rails {
		encoded += rail
	}
	return
}

func encodeRails(message string, numRails int) []string {
	rails := make([]string, numRails)
	railIndex, direction := 0, Down

	for _, c := range message {
		rails[railIndex] += string(c)
		railIndex, direction = advance(railIndex, direction, numRails)
	}

	return rails
}

func Decode(message string, numRails int) (decoded string) {
	rails := splitMessageIntoRails(message, numRails)
	railIndex, direction := 0, Down

	for i := 0; i < len(message); i++ {
		decoded += string(rails[railIndex][0])
		rails[railIndex] = rails[railIndex][1:]
		railIndex, direction = advance(railIndex, direction, numRails)
	}

	return
}

func splitMessageIntoRails(message string, numRails int) []string {
	railLengths := calculateRailLengths(len(message), numRails)
	rails := make([]string, numRails)
	start := 0

	for i, length := range railLengths {
		rails[i] = message[start : start+length]
		start += length
	}

	return rails
}

func calculateRailLengths(messageLength, numRails int) []int {
	railLengths := make([]int, numRails)
	railIndex, direction := 0, Down

	for i := 0; i < messageLength; i++ {
		railLengths[railIndex]++
		railIndex, direction = advance(railIndex, direction, numRails)
	}

	return railLengths
}

func advance(railIndex, direction, numRails int) (nextIndex, nextDirection int) {
	if direction == Down {
		if railIndex == numRails-1 {
			return railIndex - 1, Up
		}
		return railIndex + 1, Down
	}
	if railIndex == 0 {
		return railIndex + 1, Down
	}
	return railIndex - 1, Up
}