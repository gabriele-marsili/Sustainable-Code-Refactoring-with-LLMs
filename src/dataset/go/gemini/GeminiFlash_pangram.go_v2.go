package pangram

import "strings"

// Precompute the target mask for all 26 lowercase English letters.
// 'a' corresponds to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
// The mask for a full alphabet would have bits 0 through 25 set.
const allLettersMask int = (1 << 26) - 1

func IsPangram(input string) bool {
	var seenLettersMask int = 0
	lowerInput := strings.ToLower(input)

	for _, r := range lowerInput {
		if r >= 'a' && r <= 'z' {
			bitPosition := r - 'a'
			seenLettersMask |= (1 << bitPosition)

			if seenLettersMask == allLettersMask {
				return true
			}
		}
	}

	return seenLettersMask == allLettersMask
}