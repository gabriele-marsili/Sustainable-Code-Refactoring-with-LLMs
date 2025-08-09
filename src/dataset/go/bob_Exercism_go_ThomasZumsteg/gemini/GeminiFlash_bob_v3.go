package bob

import (
	"strings"
	"unicode"
)

//TestVersion is the test suite that this will pass
const TestVersion = 1

/*Hey responds to a greeting like a lackadaisical teenager.*/
func Hey(greeting string) string {
	greeting = strings.TrimSpace(greeting)

	isQuestion := false
	if len(greeting) > 0 && greeting[len(greeting)-1] == '?' {
		isQuestion = true
	}

	shouting := isShouting(greeting)

	switch {
	case greeting == "":
		return "Fine. Be that way!"
	case shouting:
		return "Whoa, chill out!"
	case isQuestion:
		return "Sure."
	default:
		return "Whatever."
	}
}

// isShouting determines if a string contains at least one letter and all its letters are uppercase.
func isShouting(s string) bool {
	hasLetter := false
	allLettersUpper := true

	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true
			if unicode.IsLower(r) {
				allLettersUpper = false
				break // Found a lowercase letter, so it cannot be all uppercase.
			}
		}
	}
	return hasLetter && allLettersUpper
}