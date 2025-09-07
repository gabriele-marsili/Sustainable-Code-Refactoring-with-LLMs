package rotationalcipher

func RotationalCipher(plainText string, distance int) string {
	if len(plainText) == 0 {
		return ""
	}
	
	distance = ((distance % 26) + 26) % 26
	if distance == 0 {
		return plainText
	}
	
	result := make([]byte, len(plainText))
	
	for i := 0; i < len(plainText); i++ {
		char := plainText[i]
		if char >= 'a' && char <= 'z' {
			result[i] = byte((int(char-'a')+distance)%26) + 'a'
		} else if char >= 'A' && char <= 'Z' {
			result[i] = byte((int(char-'A')+distance)%26) + 'A'
		} else {
			result[i] = char
		}
	}
	
	return string(result)
}