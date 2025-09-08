package isogram

// IsIsogram check is a word is an isogram, meaning has no repeatable words.
//
// Modified to combine fant0mz's optimized version.
//
// Original version: https://exercism.org/tracks/go/exercises/isogram/solutions/thinkverse
//
// Optimized version: https://exercism.org/tracks/go/exercises/isogram/solutions/fant0mz
//
// Slightly more optimized version using a bit mask, thank you for the inspiration @bobahop
//
// https://exercism.org/profiles/bobahop/
func IsIsogram(word string) bool {
	var mask uint32

	for i := 0; i < len(word); i++ {
		char := word[i]

		// Convert to lowercase if uppercase
		if char >= 'A' && char <= 'Z' {
			char += 32
		}

		// Process only lowercase letters
		if char >= 'a' && char <= 'z' {
			bit := uint32(1) << (char - 'a')
			
			// Check if character already seen
			if mask&bit != 0 {
				return false
			}
			
			// Mark character as seen
			mask |= bit
		}
	}

	return true
}