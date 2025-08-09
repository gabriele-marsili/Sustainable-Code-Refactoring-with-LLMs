package pangram

func IsPangram(input string) bool {
	var seenLetters uint32
	var uniqueCount int

	const totalAlphabetLetters = 26

	for _, r := range input {
		if r >= 'A' && r <= 'Z' {
			r += ('a' - 'A')
		}

		if r >= 'a' && r <= 'z' {
			bitPos := r - 'a'
			if (seenLetters & (1 << bitPos)) == 0 {
				seenLetters |= (1 << bitPos)
				uniqueCount++

				if uniqueCount == totalAlphabetLetters {
					return true
				}
			}
		}
	}

	return uniqueCount == totalAlphabetLetters
}