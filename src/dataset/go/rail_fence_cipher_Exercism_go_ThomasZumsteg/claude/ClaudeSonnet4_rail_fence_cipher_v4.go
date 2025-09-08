package railfence

func Encode(plainText string, numRails int) string {
	if numRails <= 1 || len(plainText) <= 1 {
		return plainText
	}
	
	cipher := makeCipher(len(plainText), numRails)
	result := make([]byte, len(plainText))
	for to, from := range cipher {
		result[to] = plainText[from]
	}
	return string(result)
}

func Decode(cipherText string, numRails int) string {
	if numRails <= 1 || len(cipherText) <= 1 {
		return cipherText
	}
	
	cipher := makeCipher(len(cipherText), numRails)
	result := make([]byte, len(cipherText))
	for from, to := range cipher {
		result[to] = cipherText[from]
	}
	return string(result)
}

func MakeCipher(items int, numRails int) []int {
	return makeCipher(items, numRails)
}

func makeCipher(items int, numRails int) []int {
	if numRails <= 1 {
		result := make([]int, items)
		for i := range result {
			result[i] = i
		}
		return result
	}
	
	rails := make([][]int, numRails)
	rail, dRail := 0, 1
	
	for i := 0; i < items; i++ {
		rails[rail] = append(rails[rail], i)
		if rail+dRail < 0 || rail+dRail >= numRails {
			dRail = -dRail
		}
		rail += dRail
	}
	
	result := make([]int, 0, items)
	for _, slice := range rails {
		result = append(result, slice...)
	}
	return result
}