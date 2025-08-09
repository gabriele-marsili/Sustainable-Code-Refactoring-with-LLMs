package pangram

// Optimized algorithm using bit fields.
// Thank you for the inspiration @bobahop
//
// https://exercism.org/profiles/bobahop/

// allLettersMask is a bitmask where all 26 bits (0-25) are set,
// representing all English letters from 'a' to 'z'.
const allLettersMask uint32 = (1 << 26) - 1

// IsPangram checks if the input string is a pangram, meaning it contains every
// letter of the alphabet at least once (case-insensitive).
func IsPangram(input string) bool {
	var mask uint32

	// Iterate over the bytes of the input string.
	// This is efficient for character-by-character processing,
	// as only ASCII English letters are relevant for pangram detection.
	for i := 0; i < len(input); i++ {
		char := input[i]

		// Check if the character is an ASCII lowercase letter (a-z)
		if char >= 'a' && char <= 'z' {
			mask |= (1 << (char - 'a'))
		} else if char >= 'A' && char <= 'Z' {
			// If it's an ASCII uppercase letter (A-Z), convert it to its
			// lowercase equivalent's bit position.
			mask |= (1 << (char - 'A'))
		}
		// Non-letter characters (e.g., numbers, symbols, spaces, non-ASCII characters)
		// are implicitly ignored, as they do not fall into the above ranges.

		// Early exit optimization: If all 26 letter bits in the mask are set,
		// it means all letters have been found, and we can return true immediately
		// without processing the rest of the string.
		if mask == allLettersMask {
			return true
		}
	}

	// After iterating through the entire string, return true if the final mask
	// contains all 26 bits set, indicating all letters were found.
	return mask == allLettersMask
}