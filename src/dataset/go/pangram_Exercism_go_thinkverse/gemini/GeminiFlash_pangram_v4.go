package pangram

func IsPangram(input string) bool {
	var mask uint32
	const targetMask uint32 = (1 << 26) - 1

	for i := 0; i < len(input); i++ {
		char := input[i]

		if char >= 'a' && char <= 'z' {
			mask |= 1 << (char - 'a')
		} else if char >= 'A' && char <= 'Z' {
			mask |= 1 << (char - 'A')
		}

		if mask == targetMask {
			return true
		}
	}

	return mask == targetMask
}