package atbash

func Atbash(plainText string) string {
	var cipherText []rune
	count := 0
	for _, char := range plainText {
		if shifted := encode(char); shifted != ' ' {
			cipherText = append(cipherText, shifted)
			count++
			if count%5 == 0 {
				cipherText = append(cipherText, ' ')
			}
		}
	}
	if len(cipherText) > 0 && cipherText[len(cipherText)-1] == ' ' {
		cipherText = cipherText[:len(cipherText)-1]
	}
	return string(cipherText)
}

func encode(char rune) rune {
	switch {
	case 'a' <= char && char <= 'z':
		return 'z' - char + 'a'
	case 'A' <= char && char <= 'Z':
		return 'Z' - char + 'a'
	case '0' <= char && char <= '9':
		return char
	default:
		return ' '
	}
}