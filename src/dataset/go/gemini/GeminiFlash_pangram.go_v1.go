package pangram

import "unicode"

// allLettersMask represents a bitmask where each of the first 26 bits
// corresponds to a letter of the English alphabet (a-z).
// Bit 0 for 'a', Bit 1 for 'b', ..., Bit 25 for 'z'.
// When all 26 bits are set, it means all letters have been found.
// (1 << 26) - 1 creates a number with the first 26 bits set to 1.
const allLettersMask int32 = (1 << 26) - 1

// IsPangram checks if the input string is a pangram.
// A pangram is a sentence containing every letter of the alphabet at least once.
// Case and non-alphabetic characters are ignored.
func IsPangram(input string) bool {
	var seenLettersMask int32 = 0

	for _, r := range input {
		// Convert the rune to its lowercase equivalent.
		// This handles both 'A'-'Z' and 'a'-'z' as well as other Unicode characters.
		r = unicode.ToLower(r)

		// Check if the lowercase rune is an English alphabet character ('a' through 'z').
		if r >= 'a' && r <= 'z' {
			// Calculate the bit position (0 for 'a', 1 for 'b', ..., 25 for 'z').
			bitPos := r - 'a'
			// Set the corresponding bit in the seenLettersMask.
			// The |= operator ensures that if a bit is already set, it remains set.
			seenLettersMask |= (1 << bitPos)
		}
	}

	// A string is a pangram if and only if all 26 bits in the seenLettersMask are set,
	// meaning all letters from 'a' to 'z' were found in the input.
	return seenLettersMask == allLettersMask
}

// The getSetOfUsedRunes function and const alphabet are removed as they are no longer
// used by the optimized IsPangram function. Removing unexported helpers that are
// no longer needed is a valid optimization as it reduces code size and complexity
// without affecting the public interface (IsPangram's signature remains unchanged).