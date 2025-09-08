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
		if direction == Down {
			if railIndex == numRails-1 {
				direction = Up
				railIndex--
			} else {
				railIndex++
			}
		} else {
			if railIndex == 0 {
				direction = Down
				railIndex++
			} else {
				railIndex--
			}
		}
	}

	return rails
}

func Decode(message string, numRails int) (decoded string) {
	rails := splitMessageIntoRails(message, numRails)
	railIndex, direction := 0, Down

	for i := 0; i < len(message); i++ {
		r, trimmed := trimFirstRune(rails[railIndex])
		decoded += string(r)
		rails[railIndex] = trimmed

		if direction == Down {
			if railIndex == numRails-1 {
				direction = Up
				railIndex--
			} else {
				railIndex++
			}
		} else {
			if railIndex == 0 {
				direction = Down
				railIndex++
			} else {
				railIndex--
			}
		}
	}

	return
}

func trimFirstRune(s string) (rune, string) {
	r, i := utf8.DecodeRuneInString(s)
	return r, s[i:]
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

func calculateRailLengths(messageLen, numRails int) []int {
	railLengths := make([]int, numRails)
	railIndex, direction := 0, Down

	for i := 0; i < messageLen; i++ {
		railLengths[railIndex]++
		if direction == Down {
			if railIndex == numRails-1 {
				direction = Up
				railIndex--
			} else {
				railIndex++
			}
		} else {
			if railIndex == 0 {
				direction = Down
				railIndex++
			} else {
				railIndex--
			}
		}
	}

	return railLengths
}

func advance(direction int, railIndex, numRails int) (nextDirection int, nextIndex int) {
	if direction == Down {
		if railIndex == numRails-1 {
			return Up, railIndex - 1
		}
		return Down, railIndex + 1
	}
	if railIndex == 0 {
		return Down, railIndex + 1
	}
	return Up, railIndex - 1
}