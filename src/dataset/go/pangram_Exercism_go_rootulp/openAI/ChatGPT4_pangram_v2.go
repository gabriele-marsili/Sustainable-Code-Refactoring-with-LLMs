package pangram

import "unicode"

func IsPangram(input string) bool {
	var seen [26]bool
	count := 0
	for _, r := range input {
		if unicode.IsLetter(r) {
			r = unicode.ToLower(r)
			idx := r - 'a'
			if idx >= 0 && idx < 26 && !seen[idx] {
				seen[idx] = true
				count++
				if count == 26 {
					return true
				}
			}
		}
	}
	return false
}