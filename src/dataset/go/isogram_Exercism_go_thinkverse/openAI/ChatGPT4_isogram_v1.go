package isogram

import "unicode"

// IsIsogram checks if a word is an isogram, meaning it has no repeated letters.
func IsIsogram(word string) bool {
	var mask uint32

	for _, char := range word {
		// Normalize to lowercase if it's a letter.
		if unicode.IsLetter(char) {
			char = unicode.ToLower(char)
			bit := uint32(1) << (char - 'a')

			// Check if the character is already recorded.
			if mask&bit != 0 {
				return false
			}

			// Record the character in the bit mask.
			mask |= bit
		}
	}

	return true
}