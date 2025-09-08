package railfence

import (
	"strings"
	"unicode/utf8"
)

const Down = "down"
const Up = "up"

func Encode(message string, numRails int) string {
	if numRails <= 1 {
		return message
	}

	rails := make([]strings.Builder, numRails)
	railIndex := 0
	direction := Down

	for _, c := range message {
		rails[railIndex].WriteRune(c)
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

	railLengths := calculateRailLengths(message, numRails)
	rails := make([]string, numRails)
	start := 0
	for i, length := range railLengths {
		rails[i] = message[start : start+length]
		start += length
	}

	var decoded strings.Builder
	railIndex := 0
	direction := Down

	messageLength := len(message)
	for i := 0; i < messageLength; i++ {
		r, size := utf8.DecodeRuneInString(rails[railIndex])
		decoded.WriteRune(r)
		rails[railIndex] = rails[railIndex][size:]

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

	return decoded.String()
}

func calculateRailLengths(message string, numRails int) []int {
	railLengths := make([]int, numRails)
	railIndex := 0
	direction := Down

	for i := 0; i < len(message); i++ {
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