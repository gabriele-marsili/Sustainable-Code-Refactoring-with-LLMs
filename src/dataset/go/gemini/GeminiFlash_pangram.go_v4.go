package pangram

import "unicode"

func IsPangram(input string) bool {
	var foundLetters uint32
	lettersCount := 0

	for _, r := range input {
		r = unicode.ToLower(r)

		if r >= 'a' && r <= 'z' {
			bitPos := r - 'a'
			letterBit := uint32(1) << bitPos

			if (foundLetters & letterBit) == 0 {
				foundLetters |= letterBit
				lettersCount++
			}
		}

		if lettersCount == 26 {
			return true
		}
	}

	return lettersCount == 26
}