package railfence

import (
	"strings"
	"unicode/utf8"
)

const Down = "down"
const Up = "up"

func Encode(message string, numRails int) (encoded string) {
	if numRails <= 1 || len(message) == 0 {
		return message
	}
	
	rails := make([]strings.Builder, numRails)
	railIndex := 0
	direction := Down

	for _, c := range message {
		rails[railIndex].WriteRune(c)
		direction, railIndex = advance(direction, railIndex, numRails)
	}

	var result strings.Builder
	result.Grow(len(message))
	for i := range rails {
		result.WriteString(rails[i].String())
	}
	return result.String()
}

func encodeRails(message string, numRails int) []string {
	if numRails <= 1 || len(message) == 0 {
		return []string{message}
	}
	
	rails := make([]strings.Builder, numRails)
	railIndex := 0
	direction := Down

	for _, c := range message {
		rails[railIndex].WriteRune(c)
		direction, railIndex = advance(direction, railIndex, numRails)
	}

	result := make([]string, numRails)
	for i := range rails {
		result[i] = rails[i].String()
	}
	return result
}

func Decode(message string, numRails int) (decoded string) {
	if numRails <= 1 || len(message) == 0 {
		return message
	}
	
	rails := splitMessageIntoRails(message, numRails)
	railIndex := 0
	direction := Down
	railPositions := make([]int, numRails)

	var result strings.Builder
	result.Grow(len(message))

	for railPositions[railIndex] < len(rails[railIndex]) {
		r, size := utf8.DecodeRuneInString(rails[railIndex][railPositions[railIndex]:])
		result.WriteRune(r)
		railPositions[railIndex] += size
		direction, railIndex = advance(direction, railIndex, numRails)
	}

	return result.String()
}

func trimFirstRune(s string) (rune, string) {
	r, i := utf8.DecodeRuneInString(s)
	return r, s[i:]
}

func splitMessageIntoRails(message string, numRails int) []string {
	if numRails <= 1 {
		return []string{message}
	}
	
	railLengths := calculateRailLengths(message, numRails)
	rails := make([]string, numRails)
	
	start := 0
	for i, length := range railLengths {
		rails[i] = message[start : start+length]
		start += length
	}

	return rails
}

func calculateRailLengths(message string, numRails int) []int {
	lengths := make([]int, numRails)
	railIndex := 0
	direction := Down

	for range message {
		lengths[railIndex]++
		direction, railIndex = advance(direction, railIndex, numRails)
	}

	return lengths
}

func lengthOfRail(message string, numRails int, index int) int {
	rails := encodeRails(message, numRails)
	return len(rails[index])
}

func initRails(numRails int) (rails []string) {
	return make([]string, numRails)
}

func advance(direction string, railIndex int, numRails int) (nextDirection string, nextIndex int) {
	if direction == "down" {
		if railIndex == numRails-1 {
			return "up", railIndex - 1
		}
		return "down", railIndex + 1
	}
	if railIndex == 0 {
		return "down", railIndex + 1
	}
	return "up", railIndex - 1
}