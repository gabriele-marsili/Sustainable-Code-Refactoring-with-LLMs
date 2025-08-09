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

	isQuestion := false
	hasUpper := false
	hasLower := false

	for i, r := range greeting {
		if !hasUpper && unicode.IsUpper(r) {
			hasUpper = true
		}
		if !hasLower && unicode.IsLower(r) {
			hasLower = true
		}
		if i == len(greeting)-1 && r == '?' {
			isQuestion = true
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