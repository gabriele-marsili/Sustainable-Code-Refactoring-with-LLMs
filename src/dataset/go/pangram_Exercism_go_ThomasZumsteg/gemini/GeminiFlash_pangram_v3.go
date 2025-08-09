package pangram

import (
	"unicode"
)

// IsPangram checks if a string is a pangram, meaning it contains every letter of the alphabet at least once.
// The function is optimized for performance, memory, and energy efficiency.
func IsPangram(s string) bool {
	// A bitmask to keep track of the letters found.
	// Each bit from 0 to 25 corresponds to a letter 'a' through 'z'.
	// A uint32 is sufficient as we only need 26 bits.
	var seenLetters uint32 = 0

	// The target mask represents all 26 letters ('a' through 'z') being present.
	// (1 << 26) creates a 1 at the 26th bit position (0-indexed). Subtracting 1
	// sets all bits from 0 to 25 to 1.
	const allLettersMask uint32 = (1 << 26) - 1

	// Iterate over each character (rune) in the input string.
	// Iterating over runes correctly handles multi-byte characters.
	for _, r := range s {
		// Convert the rune to its lowercase equivalent.
		// unicode.ToLower handles all Unicode characters, including ASCII.
		lc := unicode.ToLower(r)

		// Check if the lowercase rune is an English alphabet letter ('a' through 'z').
		if lc >= 'a' && lc <= 'z' {
			// Calculate the bit position for the current letter.
			// 'a' maps to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
			bitPos := lc - 'a'

			// Set the corresponding bit in the seenLetters mask.
			// The |= operator performs a bitwise OR, ensuring the bit is set
			// if it wasn't already, without affecting other bits.
			seenLetters |= (1 << bitPos)

			// Early exit optimization: If all 26 bits in seenLetters are set
			// (meaning all letters 'a' through 'z' have been found),
			// we can immediately return true without processing the rest of the string.
			if seenLetters == allLettersMask {
				return true
			}
		}
	}

	// After iterating through the entire string, return true if and only if
	// all 26 bits in seenLetters are set, indicating all letters were present.
	return seenLetters == allLettersMask
}