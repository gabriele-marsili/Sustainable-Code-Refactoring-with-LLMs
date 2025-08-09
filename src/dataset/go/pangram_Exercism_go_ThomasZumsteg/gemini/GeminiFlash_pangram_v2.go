package pangram

import "unicode"

// IsPangram checks if a string is a pangram, meaning it contains every letter
// of the alphabet at least once. Case is ignored, and non-alphabetic characters
// are irrelevant.
func IsPangram(s string) bool {
	// A bitmask to track the presence of each letter 'a' through 'z'.
	// There are 26 letters in the English alphabet. A uint32 has 32 bits,
	// which is sufficient.
	var seenLetters uint32

	// The target mask where all 26 bits (0 through 25) are set.
	// This represents all letters 'a' through 'z' being found.
	const allLettersMask uint32 = (1 << 26) - 1

	for _, r := range s {
		// Convert the rune to its lowercase equivalent.
		// unicode.ToLower handles all Unicode characters,
		// including ASCII and international variations.
		lowerR := unicode.ToLower(r)

		// Check if the character is an English alphabet letter (a-z).
		if lowerR >= 'a' && lowerR <= 'z' {
			// Calculate the bit position for this letter.
			// 'a' maps to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
			bitPos := lowerR - 'a'

			// Set the corresponding bit in seenLetters.
			seenLetters |= (1 << uint(bitPos))

			// Optimization: If all 26 bits are set, we have found all letters
			// and can return true immediately without processing the rest of the string.
			if seenLetters == allLettersMask {
				return true
			}
		}
	}

	// After iterating through the entire string, check if all 26 letters were found.
	return seenLetters == allLettersMask
}