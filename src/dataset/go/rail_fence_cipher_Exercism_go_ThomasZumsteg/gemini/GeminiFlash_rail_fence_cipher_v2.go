package railfence

import (
	"strings"
)

func Encode(plainText string, numRails int) string {
	length := len(plainText)
	rails := make([][]rune, numRails)
	rail := 0
	direction := 1

	for i, r := range plainText {
		rails[rail] = append(rails[rail], r)
		rail += direction

		if rail >= numRails {
			rail = numRails - 2
			direction = -1
		} else if rail < 0 {
			rail = 1
			direction = 1
		}

		if numRails == 1 {
			rail = 0
		}

		if numRails <= 0 {
			return plainText
		}

		if i >= length {
			break
		}
	}

	var result strings.Builder
	result.Grow(length)
	for _, r := range rails {
		for _, c := range r {
			result.WriteRune(c)
		}
	}
	return result.String()
}

func Decode(cipherText string, numRails int) string {
	length := len(cipherText)
	rails := make([][]int, numRails)
	rail := 0
	direction := 1

	for i := 0; i < length; i++ {
		rails[rail] = append(rails[rail], i)
		rail += direction

		if rail >= numRails {
			rail = numRails - 2
			direction = -1
		} else if rail < 0 {
			rail = 1
			direction = 1
		}

		if numRails == 1 {
			rail = 0
		}

		if numRails <= 0 {
			return cipherText
		}
	}

	var result strings.Builder
	result.Grow(length)
	index := 0
	plainText := make([]rune, length)
	for _, r := range rails {
		for _, i := range r {
			plainText[i] = rune(cipherText[index])
			index++
		}
	}

	for _, r := range plainText {
		result.WriteRune(r)
	}

	return result.String()
}