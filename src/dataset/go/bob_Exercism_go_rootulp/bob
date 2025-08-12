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
	isAllUpper := true

	for _, r := range parsed {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				isAllUpper = false
				break
			}
		}
	}

	if hasLetter && isAllUpper && isQuestion {
		return "Calm down, I know what I'm doing!"
	} else if isQuestion {
		return "Sure."
	} else if hasLetter && isAllUpper {
		return "Whoa, chill out!"
	}

	return "Whatever."
}