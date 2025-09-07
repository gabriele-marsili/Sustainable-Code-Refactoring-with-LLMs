package rotationalcipher

func RotationalCipher(plainText string, distance int) string {
	result := make([]rune, len(plainText))
	distance = distance % 26
	for i, char := range plainText {
		if 'a' <= char && char <= 'z' {
			result[i] = 'a' + (char-'a'+rune(distance))%26
		} else if 'A' <= char && char <= 'Z' {
			result[i] = 'A' + (char-'A'+rune(distance))%26
		} else {
			result[i] = char
		}
	}
	return string(result)
}