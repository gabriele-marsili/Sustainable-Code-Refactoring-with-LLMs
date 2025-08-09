package pangram

func IsPangram(s string) bool {
	var seenLetters uint32 // A bitmask to track which letters (a-z) have been seen.
	// This constant represents a bitmask where bits 0 through 25 are set,
	// corresponding to all letters from 'a' to 'z'.
	const allLettersMask uint32 = (1 << 26) - 1

	for _, r := range s {
		if r >= 'a' && r <= 'z' {
			// If it's a lowercase letter, set the corresponding bit.
			seenLetters |= (1 << (r - 'a'))
		} else if r >= 'A' && r <= 'Z' {
			// If it's an uppercase letter, convert it to its lowercase equivalent
			// and set the corresponding bit.
			seenLetters |= (1 << (r - 'A'))
		}

		// Optimization: If all 26 bits are set, it means we've found all
		// letters of the alphabet, so we can return true immediately
		// without processing the rest of the string.
		if seenLetters == allLettersMask {
			return true
		}
	}

	// After iterating through the entire string, check if all letters
	// from 'a' to 'z' were found.
	return seenLetters == allLettersMask
}