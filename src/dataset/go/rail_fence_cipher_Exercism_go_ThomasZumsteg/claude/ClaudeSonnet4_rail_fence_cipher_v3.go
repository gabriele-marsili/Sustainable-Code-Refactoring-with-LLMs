package railfence

import (
	"strings"
)

func Encode(plainText string, numRails int) string {
	if numRails <= 1 || len(plainText) <= 1 {
		return plainText
	}
	
	var result strings.Builder
	result.Grow(len(plainText))
	
	for rail := 0; rail < numRails; rail++ {
		pos := rail
		down := true
		
		for pos < len(plainText) {
			result.WriteByte(plainText[pos])
			
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
	
	return result.String()
}

func Decode(cipherText string, numRails int) string {
	if numRails <= 1 || len(cipherText) <= 1 {
		return cipherText
	}
	
	plainText := make([]byte, len(cipherText))
	cipherIndex := 0
	
	for rail := 0; rail < numRails; rail++ {
		pos := rail
		down := true
		
		for pos < len(cipherText) {
			plainText[pos] = cipherText[cipherIndex]
			cipherIndex++
			
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