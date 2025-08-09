package bob

import (
	"strings"
	"unicode"
)

// Hey returns a string with Bob's response.
func Hey(remark string) string {
	parsed := strings.TrimSpace(remark)

	if isEmpty(parsed) {
		return "Fine. Be that way!"
	}

	// Calculate flags once to avoid redundant computations
	isQuestionMark := isQuestion(parsed)
	isYellingVoice := isYelling(parsed)

	if isYellingVoice && isQuestionMark {
		return "Calm down, I know what I'm doing!"
	} else if isQuestionMark {
		return "Sure."
	} else if isYellingVoice {
		return "Whoa, chill out!"
	} else {
		return "Whatever."
	}
}

// isYelling checks if the string contains any letters and all letters are uppercase.
// It avoids creating intermediate strings and performs a single pass.
func isYelling(s string) bool {
	hasLetter := false
	hasLower := false

	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true
			if unicode.IsLower(r) {
				hasLower = true
			}
		}
	}
	return hasLetter && !hasLower
}

// isQuestion checks if the string ends with a question mark.
func isQuestion(s string) bool {
	return strings.HasSuffix(s, "?")
}

// isEmpty checks if the string is empty.
func isEmpty(s string) bool {
	return s == ""
}