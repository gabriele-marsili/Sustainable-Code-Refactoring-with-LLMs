package pangram

import (
	"unicode"
)

func IsPangram(input string) bool {
	var seenLetters uint32
	const allLettersMask uint32 = (1 << 26) - 1 // A bitmask where all 26 bits (0-25) are set, representing 'a' through 'z'

	for _, r := range input {
		lcR := unicode.ToLower(r) // Convert rune to its lowercase equivalent

		// Check if the character is an English lowercase letter
		if lcR >= 'a' && lcR <= 'z' {
			// Calculate the bit position for this letter (0 for 'a', 1 for 'b', ..., 25 for 'z')
			bitPos := lcR - 'a'
			// Set the corresponding bit in our seenLetters bitmask
			seenLetters |= (1 << bitPos)

			// Early exit: If all 26 bits are set, we've found all unique letters
			if seenLetters == allLettersMask {
				return true
			}
		}
	}

	// After iterating through the entire string, check if all 26 bits are set
	return seenLetters == allLettersMask
}