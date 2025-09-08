package railfence

import (
	"strings"
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
	direction := Down

	for _, c := range message {
		rails[railIndex].WriteRune(c)
		if direction == Down {
			railIndex++
			if railIndex == numRails {
				railIndex -= 2
				direction = Up
			}
		} else {
			railIndex--
			if railIndex < 0 {
				railIndex = 1
				direction = Down
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

	msgLen := len(message)
	railLen := make([]int, numRails)
	railIndex := 0
	direction := Down

	for i := 0; i < msgLen; i++ {
		railLen[railIndex]++
		if direction == Down {
			railIndex++
			if railIndex == numRails {
				railIndex -= 2
				direction = Up
			}
		} else {
			railIndex--
			if railIndex < 0 {
				railIndex = 1
				direction = Down
			}
		}
	}

	rails := make([]string, numRails)
	start := 0
	for i := 0; i < numRails; i++ {
		rails[i] = message[start : start+railLen[i]]
		start += railLen[i]
	}

	decoded := make([]rune, msgLen)
	railIndex = 0
	direction = Down
	railPos := make([]int, numRails)

	for i := 0; i < msgLen; i++ {
		decoded[i] = rune(rails[railIndex][railPos[railIndex]])
		railPos[railIndex]++

		if direction == Down {
			railIndex++
			if railIndex == numRails {
				railIndex -= 2
				direction = Up
			}
		} else {
			railIndex--
			if railIndex < 0 {
				railIndex = 1
				direction = Down
			}
		}
	}

	return string(decoded)
}