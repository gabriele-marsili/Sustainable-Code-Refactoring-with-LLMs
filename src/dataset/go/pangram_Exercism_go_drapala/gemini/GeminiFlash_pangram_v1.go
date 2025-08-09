package pangram

func IsPangram(input string) bool {
	var seenLetters uint32 = 0
	// This mask represents all 26 lowercase English letters set (bits 0 to 25).
	// (1 << 26) is 1 followed by 26 zeros. Subtracting 1 sets all those 26 bits to 1.
	const fullMask uint32 = (1 << 26) - 1

	for _, r := range input {
		if r >= 'a' && r <= 'z' {
			// Set the corresponding bit for lowercase letters
			seenLetters |= (1 << (r - 'a'))
		} else if r >= 'A' && r <= 'Z' {
			// Set the corresponding bit for uppercase letters (treat as lowercase)
			seenLetters |= (1 << (r - 'A'))
		}

		// Early exit: If all 26 letters have been found, we can return true immediately.
		if seenLetters == fullMask {
			return true
		}
	}

	// After iterating through the entire string, check if all bits are set.
	return seenLetters == fullMask
}