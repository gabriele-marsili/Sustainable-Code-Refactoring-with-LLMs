package rotationalcipher

func RotationalCipher(plainText string, distance int) string {
	result := make([]rune, len(plainText))
	for i, char := range plainText {
		switch {
		case 'a' <= char && char <= 'z':
			result[i] = 'a' + (char-'a'+rune(distance))%26
		case 'A' <= char && char <= 'Z':
			result[i] = 'A' + (char-'A'+rune(distance))%26
		default:
			result[i] = char
		}
	}
	return string(result)
}