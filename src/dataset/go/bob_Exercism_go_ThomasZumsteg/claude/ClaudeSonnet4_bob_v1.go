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

	for _, r := range greeting {
		if unicode.IsLetter(r) {
			hasLetter = true
			if unicode.IsUpper(r) {
				hasUpper = true
			} else {
				hasLower = true
			}
			if hasUpper && hasLower {
				break
			}
		}
	}

	if hasLetter && hasUpper && !hasLower {
		return "Whoa, chill out!"
	}

	if greeting[len(greeting)-1] == '?' {
		return "Sure."
	}

	return "Whatever."
}

/*any determines if any items in a string pass some test*/
func any(items string, test func(rune) bool) bool {
	for _, item := range items {
		if test(item) {
			return true
		}
	}
	return false
}