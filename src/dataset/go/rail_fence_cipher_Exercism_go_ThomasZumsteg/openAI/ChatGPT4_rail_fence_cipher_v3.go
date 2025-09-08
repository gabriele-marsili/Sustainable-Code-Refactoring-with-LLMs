package railfence

import (
	"strings"
)

func Encode(plainText string, numRails int) string {
	length := len(plainText)
	cipherText := make([]byte, length)
	cipher := MakeCipher(length, numRails)
	for i, from := range cipher {
		cipherText[i] = plainText[from]
	}
	return string(cipherText)
}

func Decode(cipherText string, numRails int) string {
	length := len(cipherText)
	plainText := make([]byte, length)
	cipher := MakeCipher(length, numRails)
	for i, to := range cipher {
		plainText[to] = cipherText[i]
	}
	return string(plainText)
}

func MakeCipher(items int, numRails int) []int {
	if numRails <= 1 || items <= 1 {
		result := make([]int, items)
		for i := range result {
			result[i] = i
		}
		return result
	}

	result := make([]int, items)
	rail, dRail := 0, 1
	index := 0

	for i := 0; i < numRails; i++ {
		for j, r := 0, 0; j < items; j++ {
			if r == rail {
				result[index] = j
				index++
			}
			if r+dRail < 0 || r+dRail >= numRails {
				dRail = -dRail
			}
			r += dRail
		}
		rail++
		dRail = 1
	}

	return result
}