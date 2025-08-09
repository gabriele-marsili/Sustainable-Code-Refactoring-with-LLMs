package pangram

func IsPangram(input string) bool {
	var mask uint32

	for _, char := range []byte(input) {
		if char >= 'A' && char <= 'Z' {
			mask |= 1 << (char - 'A')
		} else if char >= 'a' && char <= 'z' {
			mask |= 1 << (char - 'a')
		}
	}

	return mask == 0x3FFFFFF
}