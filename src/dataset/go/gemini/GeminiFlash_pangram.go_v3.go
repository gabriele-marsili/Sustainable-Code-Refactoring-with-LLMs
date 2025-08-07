package pangram

import "unicode"

// allLettersMask is a bitmask where bits 0-25 are set, representing the presence
// of all lowercase English alphabet characters ('a' through 'z').
const allLettersMask uint32 = (1 << 26) - 1

// IsPangram checks if the input string contains every letter of the alphabet.
// The check is case-insensitive and ignores non-alphabetic characters.
// This optimized version uses a bitmask for efficient tracking of found letters,
// avoiding memory allocations for maps and leveraging early exit conditions.
func IsPangram(input string) bool {
	var foundLetters uint32 = 0

	for _, r := range input {
		// Convert the rune to its lowercase equivalent.
		// unicode.ToLower handles all Unicode characters, ensuring correct
		// case-insensitivity for a wider range of alphabetic characters
		// than simple ASCII-only checks.
		lowerR := unicode.ToLower(r)

		// Check if the lowercase rune is within the ASCII English alphabet range.
		// This confines the pangram check to 'a' through 'z' as per common definition.
		if lowerR >= 'a' && lowerR <= 'z' {
			// Set the corresponding bit in our bitmask.
			// 'a' maps to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
			foundLetters |= (1 << (lowerR - 'a'))

			// Early exit: If all 26 bits are set, we have found all required letters.
			// This significantly improves performance for long strings that are pangrams.
			if foundLetters == allLettersMask {
				return true
			}
		}
	}

	// After iterating through the entire string, return true if all 26 letters
	// were found, indicated by the foundLetters bitmask matching allLettersMask.
	return foundLetters == allLettersMask
}