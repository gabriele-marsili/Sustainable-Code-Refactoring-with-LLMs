package bob

import (
	"strings"
	"unicode"
)

const TestVersion = 1

func Hey(greeting string) string {
	greeting = strings.TrimSpace(greeting)

	if greeting == "" {
		return "Fine. Be that way!"
	}

	if greeting[len(greeting)-1] == '?' {
		return "Sure."
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

	return "Whatever."
}

func any(items string, test func(rune) bool) bool {
	for _, item := range items {
		if test(item) {
			return true
		}
	}
	return false
}