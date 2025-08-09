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

	if greeting == "" {
		return "Fine. Be that way!"
	}

	hasUpper := false
	hasLower := false
	hasLetter := false

	// Perform a single pass over the trimmed greeting to determine
	// if it contains uppercase letters, lowercase letters, or any letters at all.
	for _, r := range greeting {
		if unicode.IsLetter(r) {
			hasLetter = true
			if unicode.IsUpper(r) {
				hasUpper = true
			} else if unicode.IsLower(r) {
				hasLower = true
			}
		}
	}

	// Determine if the greeting qualifies as shouting:
	// It must contain at least one letter, have at least one uppercase letter,
	// and contain no lowercase letters.
	isShouting := hasLetter && hasUpper && !hasLower

	// Determine if the greeting is a question:
	// It must end with a question mark.
	isQuestion := greeting[len(greeting)-1] == '?'

	switch {
	case isShouting:
		return "Whoa, chill out!"
	case isQuestion:
		return "Sure."
	default:
		return "Whatever."
	}
}

// The 'any' helper function is no longer needed as its functionality
// has been integrated into a single pass within the Hey function,
// reducing string iterations and improving efficiency.