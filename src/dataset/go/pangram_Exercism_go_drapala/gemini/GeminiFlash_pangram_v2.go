package pangram

func IsPangram(input string) bool {
	// A bitmask to track seen letters. Each bit represents a letter from 'a' to 'z'.
	// Bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
	// We need 26 bits in total.
	var seenLetters uint32 = 0

	// The target mask represents all 26 bits set (i.e., all letters 'a' through 'z' have been seen).
	// (1 << 26) - 1 results in 26 consecutive 1s in binary (0b111...111, 26 times).
	const allLettersMask uint32 = (1 << 26) - 1 // 0x3FFFFFF

	// Iterate over the input string character by character.
	for _, r := range input {
		// Convert the rune to lowercase if it's an uppercase ASCII letter.
		// This avoids the overhead of strings.ToLower() which creates a new string
		// and processes all characters, even non-alphabetic ones.
		if r >= 'A' && r <= 'Z' {
			r += 'a' - 'A' // Convert to corresponding lowercase ASCII
		}

		// Check if the character is a lowercase ASCII letter.
		if r >= 'a' && r <= 'z' {
			// Calculate the bit position for the current letter (0 for 'a', 1 for 'b', etc.)
			bitPos := r - 'a'

			// Set the corresponding bit in the seenLetters bitmask.
			seenLetters |= (1 << bitPos)

			// Early exit optimization: If all 26 bits are set, we've found all letters
			// and can return true immediately, avoiding further iteration.
			if seenLetters == allLettersMask {
				return true
			}
		}
	}

	// After checking all characters, return true if all 26 bits are set in seenLetters,
	// meaning all letters from 'a' to 'z' were present.
	return seenLetters == allLettersMask
}