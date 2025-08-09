package pangram

// Optimized algorithm using bit fields.
const allLettersMask uint32 = (1 << 26) - 1

func IsPangram(input string) bool {
	var mask uint32

	for i := 0; i < len(input); i++ {
		char := input[i]

		if char >= 'a' && char <= 'z' {
			mask |= 1 << (char - 'a')
		} else if char >= 'A' && char <= 'Z' {
			mask |= 1 << (char - 'A')
		}

		// Early exit optimization: if all 26 bits are set, we found all letters.
		if mask == allLettersMask {
			return true
		}
	}

	return mask == allLettersMask
}