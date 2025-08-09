package pangram

import "strings"

func IsPangram(input string) bool {
	// Use a bitmask to track seen lowercase English letters.
	// A uint32 is sufficient as there are only 26 lowercase letters ('a' through 'z').
	var seenMask uint32 = 0

	// This constant represents the bitmask where all 26 bits (for 'a' through 'z') are set.
	// If seenMask equals this, it means all letters have been found.
	const allLettersMask uint32 = (1 << 26) - 1

	// Convert the entire input string to lowercase once.
	// This ensures case-insensitivity as required for pangram checks.
	// While it creates a new string, it's generally more efficient than
	// converting character-by-character within the loop for typical inputs,
	// and consistent with Go's string manipulation patterns.
	lowerInput := strings.ToLower(input)

	// Iterate over each character (rune) in the lowercase input string.
	for _, r := range lowerInput {
		// Check if the current character is a lowercase English letter.
		if r >= 'a' && r <= 'z' {
			// Calculate the bit position for the letter.
			// 'a' corresponds to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
			bitPos := r - 'a'

			// Set the corresponding bit in the seenMask.
			// The |= operator performs a bitwise OR assignment, ensuring the bit is set
			// if it wasn't already, without affecting other bits.
			seenMask |= (1 << bitPos)

			// Early exit optimization: If all 26 bits are set in seenMask,
			// it means we have found all unique lowercase English letters.
			// We can return true immediately without processing the rest of the string.
			if seenMask == allLettersMask {
				return true
			}
		}
	}

	// After iterating through all characters, return true if and only if
	// all 26 lowercase English letters were found (i.e., seenMask matches allLettersMask).
	return seenMask == allLettersMask
}

// The original getSetOfUsedRunes function has been removed.
// Its functionality was to create a map to track seen runes, which has been
// replaced by the more memory-efficient and faster bitmask approach directly
// within the IsPangram function. Removing unused helper functions simplifies
// the codebase and eliminates unnecessary overhead.