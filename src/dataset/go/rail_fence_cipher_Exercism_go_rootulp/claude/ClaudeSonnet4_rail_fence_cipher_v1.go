package railfence

import (
	"fmt"
	"strings"
	"unicode/utf8"
)

const Down = "down"
const Up = "up"

func Encode(message string, numRails int) (encoded string) {
	if numRails <= 1 {
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
	for i := range rails {
		result.WriteString(rails[i].String())
	}
	return result.String()
}

func encodeRails(message string, numRails int) []string {
	if numRails <= 1 {
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
	if numRails <= 1 {
		return message
	}
	
	rails := splitMessageIntoRails(message, numRails)
	railIndex := 0
	direction := Down
	railPositions := make([]int, numRails)

	var result strings.Builder
	messageLen := utf8.RuneCountInString(message)
	
	for i := 0; i < messageLen; i++ {
		rail := rails[railIndex]
		if railPositions[railIndex] < len(rail) {
			r, size := utf8.DecodeRuneInString(rail[railPositions[railIndex]:])
			result.WriteRune(r)
			railPositions[railIndex] += size
		}
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
	if numRails <= 1 {
		return direction, 0
	}
	
	switch direction {
	case "down":
		if railIndex == numRails-1 {
			return "up", railIndex - 1
		}
		return "down", railIndex + 1
	case "up":
		if railIndex == 0 {
			return "down", railIndex + 1
		}
		return "up", railIndex - 1
	default:
		panic(fmt.Sprintf("invalid direction %v", direction))
	}
}