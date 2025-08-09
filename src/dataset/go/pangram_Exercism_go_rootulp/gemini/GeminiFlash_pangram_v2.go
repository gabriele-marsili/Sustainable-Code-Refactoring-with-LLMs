package pangram

func IsPangram(input string) bool {
	// A bitmask to track the presence of each letter 'a' through 'z'.
	// Each bit corresponds to a letter: bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
	var foundLetters uint32 = 0

	// The target mask represents all 26 bits set.
	// (1 << 26) - 1 creates a mask where bits 0 to 25 are set.
	const allLettersMask uint32 = (1 << 26) - 1

	for _, r := range input {
		// Convert the rune to lowercase if it's an uppercase letter.
		if r >= 'A' && r <= 'Z' {
			r = r + ('a' - 'A')
		}

		// Check if the rune is a lowercase English letter.
		if r >= 'a' && r <= 'z' {
			// Calculate the bit position (0-25).
			bitPos := uint32(r - 'a')
			// Set the corresponding bit in the foundLetters mask.
			foundLetters |= (1 << bitPos)

			// Early exit: if all 26 letters have been found, it's a pangram.
			if foundLetters == allLettersMask {
				return true
			}
		}
	}

	// If the loop finishes, check if all 26 letters were found.
	return foundLetters == allLettersMask
}