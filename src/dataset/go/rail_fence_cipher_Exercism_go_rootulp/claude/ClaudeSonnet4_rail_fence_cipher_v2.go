package railfence

import (
	"strings"
	"unicode/utf8"
)

func Encode(message string, numRails int) string {
	if numRails <= 1 {
		return message
	}
	
	rails := make([]strings.Builder, numRails)
	railIndex := 0
	down := true

	for _, c := range message {
		rails[railIndex].WriteRune(c)
		if down {
			railIndex++
			if railIndex == numRails-1 {
				down = false
			}
		} else {
			railIndex--
			if railIndex == 0 {
				down = true
			}
		}
	}

	var result strings.Builder
	for i := range rails {
		result.WriteString(rails[i].String())
	}
	return result.String()
}

func Decode(message string, numRails int) string {
	if numRails <= 1 {
		return message
	}

	messageLen := utf8.RuneCountInString(message)
	railLengths := calculateRailLengths(messageLen, numRails)
	
	rails := make([][]rune, numRails)
	messageRunes := []rune(message)
	start := 0
	
	for i := 0; i < numRails; i++ {
		end := start + railLengths[i]
		rails[i] = messageRunes[start:end]
		start = end
	}

	var result strings.Builder
	railIndex := 0
	down := true
	railPositions := make([]int, numRails)

	for i := 0; i < messageLen; i++ {
		result.WriteRune(rails[railIndex][railPositions[railIndex]])
		railPositions[railIndex]++
		
		if down {
			railIndex++
			if railIndex == numRails-1 {
				down = false
			}
		} else {
			railIndex--
			if railIndex == 0 {
				down = true
			}
		}
	}

	return result.String()
}

func calculateRailLengths(messageLen, numRails int) []int {
	if numRails == 1 {
		return []int{messageLen}
	}

	lengths := make([]int, numRails)
	railIndex := 0
	down := true

	for i := 0; i < messageLen; i++ {
		lengths[railIndex]++
		
		if down {
			railIndex++
			if railIndex == numRails-1 {
				down = false
			}
		} else {
			railIndex--
			if railIndex == 0 {
				down = true
			}
		}
	}

	return lengths
}