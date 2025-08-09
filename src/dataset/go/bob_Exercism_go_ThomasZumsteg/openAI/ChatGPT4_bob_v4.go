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

	isQuestion := strings.HasSuffix(greeting, "?")
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