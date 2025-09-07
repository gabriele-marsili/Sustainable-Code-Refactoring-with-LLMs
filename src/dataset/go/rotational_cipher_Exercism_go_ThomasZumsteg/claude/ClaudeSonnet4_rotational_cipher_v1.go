package rotationalcipher

func RotationalCipher(plainText string, distance int) string {
	if len(plainText) == 0 {
		return ""
	}
	
	// Normalize distance to avoid unnecessary large modulo operations
	distance = distance % 26
	if distance < 0 {
		distance += 26
	}
	
	result := make([]byte, len(plainText))
	
	for i := 0; i < len(plainText); i++ {
		char := plainText[i]
		if 'a' <= char && char <= 'z' {
			result[i] = byte((int(char-'a')+distance)%26 + 'a')
		} else if 'A' <= char && char <= 'Z' {
			result[i] = byte((int(char-'A')+distance)%26 + 'A')
		} else {
			result[i] = char
		}
	}
	
	return string(result)
}