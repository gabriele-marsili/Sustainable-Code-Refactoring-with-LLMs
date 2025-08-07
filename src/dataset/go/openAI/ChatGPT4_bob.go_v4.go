package bob

import (
	"strings"
	"unicode"
)

// Hey returns a string with Bob's response.
func Hey(remark string) string {
	parsed := strings.TrimSpace(remark)

	if parsed == "" {
		return "Fine. Be that way!"
	}

	isQuestion := strings.HasSuffix(parsed, "?")
	hasLetter := false
	isYelling := true

	for _, r := range parsed {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				isYelling = false
				break
			}
		}
	}

	if isYelling && hasLetter && isQuestion {
		return "Calm down, I know what I'm doing!"
	}
	if isQuestion {
		return "Sure."
	}
	if isYelling && hasLetter {
		return "Whoa, chill out!"
	}
	return "Whatever."
}