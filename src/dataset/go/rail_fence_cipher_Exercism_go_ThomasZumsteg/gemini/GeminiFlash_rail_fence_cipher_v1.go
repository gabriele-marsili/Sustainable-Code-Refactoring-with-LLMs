package railfence

import (
	"strings"
)

func Encode(plainText string, numRails int) string {
	length := len(plainText)
	if numRails <= 1 || length <= 1 {
		return plainText
	}

	rails := make([][]byte, numRails)
	railIndex := 0
	direction := 1 // 1 for down, -1 for up

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
		result.Write(rails[i])
	}

	return result.String()
}

func Decode(cipherText string, numRails int) string {
	length := len(cipherText)
	if numRails <= 1 || length <= 1 {
		return cipherText
	}

	rails := make([][]int, numRails)
	railIndex := 0
	direction := 1

	for i := 0; i < length; i++ {
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

	indexMap := make([]int, length)
	index := 0
	for i := 0; i < numRails; i++ {
		for _, j := range rails[i] {
			indexMap[j] = index
			index++
		}
	}

	result := make([]byte, length)
	for i := 0; i < length; i++ {
		result[indexMap[i]] = cipherText[i]
	}

	return string(result)
}