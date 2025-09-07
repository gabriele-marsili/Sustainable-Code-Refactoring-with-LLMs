package rotationalcipher

func RotationalCipher(plainText string, distance int) string {
	result := make([]rune, len(plainText))
	distance %= 26
	for i, char := range plainText {
		if 'a' <= char && char <= 'z' {
			result[i] = rune(((char - 'a' + rune(distance)) % 26) + 'a')
		} else if 'A' <= char && char <= 'Z' {
			result[i] = rune(((char - 'A' + rune(distance)) % 26) + 'A')
		} else {
			result[i] = char
		}
	}
	return string(result)
}