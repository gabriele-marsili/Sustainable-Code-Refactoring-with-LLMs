package pangram

func IsPangram(input string) bool {
	var seenLetters uint32
	const allLettersMask uint32 = (1 << 26) - 1

	for _, r := range input {
		if r >= 'A' && r <= 'Z' {
			r += 32
		}

		if r >= 'a' && r <= 'z' {
			bitPos := r - 'a'
			seenLetters |= (1 << bitPos)

			if seenLetters == allLettersMask {
				return true
			}
		}
	}

	return seenLetters == allLettersMask
}

func getSetOfUsedRunes(input string) map[rune]bool {
	set := map[rune]bool{}
	for _, r := range input {
		set[r] = true
	}
	return set
}