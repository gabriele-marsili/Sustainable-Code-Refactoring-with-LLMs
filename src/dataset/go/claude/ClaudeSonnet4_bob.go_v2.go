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

	hasQuestion := strings.HasSuffix(parsed, "?")
	hasLetters := false
	isYelling := true

	for _, r := range parsed {
		if unicode.IsLetter(r) {
			hasLetters = true
			if !unicode.IsUpper(r) {
				isYelling = false
				break
			}
		}
	}

	if !hasLetters {
		isYelling = false
	}

	if isYelling && hasQuestion {
		return "Calm down, I know what I'm doing!"
	} else if hasQuestion {
		return "Sure."
	} else if isYelling {
		return "Whoa, chill out!"
	} else {
		return "Whatever."
	}
}