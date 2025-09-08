package railfence

func Encode(plainText string, numRails int) string {
	if numRails <= 1 || len(plainText) <= 1 {
		return plainText
	}
	
	result := make([]byte, len(plainText))
	idx := 0
	
	for rail := 0; rail < numRails; rail++ {
		pos := rail
		down := true
		
		for pos < len(plainText) {
			result[idx] = plainText[pos]
			idx++
			
			if rail == 0 || rail == numRails-1 {
				pos += 2 * (numRails - 1)
			} else {
				if down {
					pos += 2 * (numRails - 1 - rail)
				} else {
					pos += 2 * rail
				}
				down = !down
			}
		}
	}
	
	return string(result)
}

func Decode(cipherText string, numRails int) string {
	if numRails <= 1 || len(cipherText) <= 1 {
		return cipherText
	}
	
	result := make([]byte, len(cipherText))
	idx := 0
	
	for rail := 0; rail < numRails; rail++ {
		pos := rail
		down := true
		
		for pos < len(cipherText) {
			result[pos] = cipherText[idx]
			idx++
			
			if rail == 0 || rail == numRails-1 {
				pos += 2 * (numRails - 1)
			} else {
				if down {
					pos += 2 * (numRails - 1 - rail)
				} else {
					pos += 2 * rail
				}
				down = !down
			}
		}
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
	
	result := make([]int, 0, items)
	
	for rail := 0; rail < numRails; rail++ {
		pos := rail
		down := true
		
		for pos < items {
			result = append(result, pos)
			
			if rail == 0 || rail == numRails-1 {
				pos += 2 * (numRails - 1)
			} else {
				if down {
					pos += 2 * (numRails - 1 - rail)
				} else {
					pos += 2 * rail
				}
				down = !down
			}
		}
	}
	
	return result
}