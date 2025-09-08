package railfence

func Encode(plainText string, numRails int) string {
	if numRails <= 1 || len(plainText) <= 1 {
		return plainText
	}
	
	result := make([]byte, len(plainText))
	cipher := MakeCipher(len(plainText), numRails)
	
	for to, from := range cipher {
		result[to] = plainText[from]
	}
	return string(result)
}

func Decode(cipherText string, numRails int) string {
	if numRails <= 1 || len(cipherText) <= 1 {
		return cipherText
	}
	
	result := make([]byte, len(cipherText))
	cipher := MakeCipher(len(cipherText), numRails)
	
	for from, to := range cipher {
		result[to] = cipherText[from]
	}
	return string(result)
}

func MakeCipher(items int, numRails int) []int {
	if numRails <= 1 || items <= 1 {
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