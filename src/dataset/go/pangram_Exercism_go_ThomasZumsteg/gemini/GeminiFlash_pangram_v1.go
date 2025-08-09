package pangram

func IsPangram(s string) bool {
	var seen uint32 // A bitmask to represent the letters 'a' through 'z' that have been seen.
	                  // Each bit corresponds to a letter (e.g., bit 0 for 'a', bit 1 for 'b', etc.).
	                  // We need 26 bits.

	for _, r := range s {
		if r >= 'a' && r <= 'z' {
			// If it's a lowercase letter, set the corresponding bit.
			seen |= (1 << (r - 'a'))
		} else if r >= 'A' && r <= 'Z' {
			// If it's an uppercase letter, convert to its lowercase equivalent index and set the bit.
			seen |= (1 << (r - 'A'))
		}

		// Optimization: If all 26 bits are set, we've found all letters and can exit early.
		// The mask for all 26 bits set is (1 << 26) - 1.
		if seen == 0x3FFFFFF { // 0x3FFFFFF is the hexadecimal representation of (1 << 26) - 1
			return true
		}
	}

	// After iterating through the entire string, check if all 26 bits were set.
	return seen == 0x3FFFFFF
}