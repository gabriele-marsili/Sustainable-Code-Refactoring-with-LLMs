package pangram

// IsPangram checks if a string is a pangram, meaning it contains every letter of the alphabet at least once.
// It uses a bitmask for efficient tracking of seen letters.
//
// Optimization Notes:
// - **Early Exit:** The most significant optimization for pangram detection is to exit as soon as all
//   26 unique letters have been found. This avoids processing the remainder of potentially long strings.
// - **Efficient Character Processing:** Iterating over bytes (`input[i]`) is preferred over iterating
//   over runes (`for _, char := range input`) for this specific problem. Pangrams are defined for
//   the English alphabet (ASCII characters 'A'-'Z' or 'a'-'z'), which are single-byte in UTF-8.
//   Byte iteration avoids the overhead of UTF-8 decoding for each character.
// - **Direct Bit Mapping:** Instead of converting uppercase letters to lowercase, we directly calculate
//   the bit position for both uppercase and lowercase ASCII letters (`char - 'A'` or `char - 'a'`).
//   This avoids an unnecessary arithmetic operation (`char += 32`) for uppercase letters.
// - **Constant for Target Mask:** Pre-calculating the `allLettersMask` as a constant (`(1 << 26) - 1`)
//   improves readability and ensures the value is computed only once at compile time.
// - **Minimal Memory Footprint:** Uses only a single `uint32` variable on the stack, resulting in
//   negligible memory consumption and no heap allocations.
func IsPangram(input string) bool {
	var mask uint32
	const allLettersMask uint32 = (1 << 26) - 1 // A bitmask with all 26 bits set (0b11...11, 26 times).

	for i := 0; i < len(input); i++ {
		char := input[i] // Access byte by index.

		if char >= 'a' && char <= 'z' {
			// If it's a lowercase ASCII letter, set the corresponding bit.
			mask |= (1 << (char - 'a'))
		} else if char >= 'A' && char <= 'Z' {
			// If it's an uppercase ASCII letter, set the corresponding bit.
			// 'A' maps to bit 0, 'B' to bit 1, etc.
			mask |= (1 << (char - 'A'))
		}
		// Other characters (numbers, symbols, spaces, non-ASCII UTF-8 bytes) are ignored,
		// as they do not fall into the 'a'-'z' or 'A'-'Z' ranges.

		// Early exit: If all 26 bits are set in the mask, we've found a pangram.
		if mask == allLettersMask {
			return true
		}
	}

	// After iterating through the entire string, return whether all bits are set.
	return mask == allLettersMask
}