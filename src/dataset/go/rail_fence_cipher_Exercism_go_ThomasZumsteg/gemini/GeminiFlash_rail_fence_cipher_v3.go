package railfence

import (
	"strings"
)

func Encode(plainText string, numRails int) string {
	length := len(plainText)
	rails := make([][]byte, numRails)
	railIndex := 0
	direction := 1

	for i := 0; i < length; i++ {
		rails[railIndex] = append(rails[railIndex], plainText[i])
		railIndex += direction

		if railIndex >= numRails {
			railIndex = numRails - 2
			direction = -1
		} else if railIndex < 0 {
			railIndex = 1
			direction = 1
		}
	}

	var result strings.Builder
	result.Grow(length)
	for i := 0; i < numRails; i++ {
		result.WriteString(string(rails[i]))
	}

	return result.String()
}

func Decode(cipherText string, numRails int) string {
	length := len(cipherText)
	railLengths := make([]int, numRails)
	railIndex := 0
	direction := 1

	for i := 0; i < length; i++ {
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

	rails := make([][]byte, numRails)
	startIndex := 0
	for i := 0; i < numRails; i++ {
		rails[i] = []byte(cipherText[startIndex : startIndex+railLengths[i]])
		startIndex += railLengths[i]
	}

	result := make([]byte, length)
	railIndex = 0
	direction = 1
	railPositions := make([]int, numRails)

	for i := 0; i < length; i++ {
		result[i] = rails[railIndex][railPositions[railIndex]]
		railPositions[railIndex]++
		railIndex += direction

		if railIndex >= numRails {
			railIndex = numRails - 2
			direction = -1
		} else if railIndex < 0 {
			railIndex = 1
			direction = 1
		}
	}

	return string(result)
}

func MakeCipher(items int, numRails int) []int {
	result := make([]int, items)
	rails := make([][]int, numRails)
	railIndex := 0
	direction := 1

	for i := 0; i < items; i++ {
		rails[railIndex] = append(rails[railIndex], i)
		railIndex += direction

		if railIndex >= numRails {
			railIndex = numRails - 2
			direction = -1
		} else if railIndex < 0 {
			railIndex = 1
			direction = 1
		}
	}

	index := 0
	for i := 0; i < numRails; i++ {
		for _, val := range rails[i] {
			result[index] = val
			index++
		}
	}
	return result
}