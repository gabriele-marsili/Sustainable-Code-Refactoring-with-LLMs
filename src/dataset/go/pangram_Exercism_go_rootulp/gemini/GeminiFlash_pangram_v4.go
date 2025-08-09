package pangram

// allLettersMask represents a bitmask where all 26 bits corresponding to 'a' through 'z' are set.
// This value is equivalent to (1 << 26) - 1.
const allLettersMask uint32 = (1 << 26) - 1

// IsPangram checks if the input string is a pangram.
// A pangram is a sentence containing every letter of the alphabet at least once.
// Case is ignored, and non-alphabetic characters are irrelevant.
func IsPangram(input string) bool {
	seenLetters := uint32(0) // Initialize a bitmask to track the presence of each letter.

	// Iterate over each rune (Unicode code point) in the input string.
	for _, r := range input {
		// Convert the rune to lowercase if it's an uppercase ASCII letter.
		// This is an efficient character-by-character conversion, avoiding the
		// allocation of a new string by `strings.ToLower` on the whole input.
		if r >= 'A' && r <= 'Z' {
			r += ('a' - 'A') // Convert to corresponding lowercase ASCII letter.
		}

		// Check if the character is a lowercase ASCII letter ('a' through 'z').
		if r >= 'a' && r <= 'z' {
			// Calculate the bit position (0 for 'a', 1 for 'b', ..., 25 for 'z').
			pos := r - 'a'
			// Set the corresponding bit in the seenLetters bitmask.
			seenLetters |= (1 << pos)
		}

		// Early exit optimization: If all 26 bits are already set, we know it's a pangram.
		// This can significantly speed up checks for long strings that are pangrams early on.
		if seenLetters == allLettersMask {
			return true
		}
	}

	// After processing all characters, check if the bitmask contains all 26 letters.
	return seenLetters == allLettersMask
}