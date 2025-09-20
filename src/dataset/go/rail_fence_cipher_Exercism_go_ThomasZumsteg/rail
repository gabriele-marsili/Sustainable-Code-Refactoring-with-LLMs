package railfence

import (
	"strings"
)

func Encode(plainText string, numRails int) string {
	cipherText := make([]byte, len(plainText))
	for to, from := range MakeCipher(len(plainText), numRails) {
		cipherText[to] = plainText[from]
	}
	return string(cipherText)
}

func Decode(cipherText string, numRails int) string {
	plainText := make([]byte, len(cipherText))
	for from, to := range MakeCipher(len(cipherText), numRails) {
		plainText[to] = cipherText[from]
	}
	return string(plainText)
}

func MakeCipher(items int, numRails int) []int {
	if numRails <= 1 || items <= 1 {
		result := make([]int, items)
		for i := 0; i < items; i++ {
			result[i] = i
		}
		return result
	}

	result := make([]int, items)
	rail, dRail := 0, 1
	index := 0

	for i := 0; i < numRails; i++ {
		for j, r := 0, rail; j < items; j++ {
			if r == j {
				result[index] = j
				index++
			}
			if r+dRail < 0 || r+dRail >= numRails {
				dRail = -dRail
			}
			r += dRail
		}
		rail++
	}

	return result
}