package bob

import (
	"strings"
	"unicode"
)

// TestVersion is the test suite that this will pass
const TestVersion = 1

/*Hey responds to a greeting like a lackadaisical teenager.*/
func Hey(greeting string) string {
	greeting = strings.TrimSpace(greeting)
	if greeting == "" {
		return "Fine. Be that way!"
	}

	isQuestion := greeting[len(greeting)-1] == '?'
	hasUpper := false
	hasLower := false

	for _, r := range greeting {
		if unicode.IsUpper(r) {
			hasUpper = true
		} else if unicode.IsLower(r) {
			hasLower = true
		}
		if hasUpper && hasLower {
			break
		}
	}

	switch {
	case hasUpper && !hasLower:
		return "Whoa, chill out!"
	case isQuestion:
		return "Sure."
	default:
		return "Whatever."
	}
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