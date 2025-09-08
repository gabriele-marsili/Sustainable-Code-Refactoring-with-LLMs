package railfence

func Encode(plainText string, numRails int) string {
	if numRails <= 1 || len(plainText) <= 1 {
		return plainText
	}
	cipherText := make([]byte, 0, len(plainText))
	rails := generateRails(len(plainText), numRails)
	for _, rail := range rails {
		for _, idx := range rail {
			cipherText = append(cipherText, plainText[idx])
		}
	}
	return string(cipherText)
}

func Decode(cipherText string, numRails int) string {
	if numRails <= 1 || len(cipherText) <= 1 {
		return cipherText
	}
	rails := generateRails(len(cipherText), numRails)
	plainText := make([]byte, len(cipherText))
	pos := 0
	for _, rail := range rails {
		for _, idx := range rail {
			plainText[idx] = cipherText[pos]
			pos++
		}
	}
	return string(plainText)
}

func generateRails(length, numRails int) [][]int {
	rails := make([][]int, numRails)
	rail, dRail := 0, 1
	for i := 0; i < length; i++ {
		rails[rail] = append(rails[rail], i)
		if rail+dRail < 0 || rail+dRail >= numRails {
			dRail = -dRail
		}
		rail += dRail
	}
	return rails
}