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

	if hasUpper && !hasLower {
		return "Whoa, chill out!"
	}
	if isQuestion {
		return "Sure."
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