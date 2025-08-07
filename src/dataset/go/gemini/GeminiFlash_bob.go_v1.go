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

	// Pre-calculate properties once to avoid redundant computations and multiple string passes.
	isQuestionMark := strings.HasSuffix(parsed, "?")
	isAllCaps := isYelling(parsed) // This call uses the optimized isYelling implementation

	// Apply the logic based on the pre-calculated flags
	if isAllCaps && isQuestionMark {
		return "Calm down, I know what I'm doing!"
	} else if isQuestionMark {
		return "Sure."
	} else if isAllCaps {
		return "Whoa, chill out!"
	} else {
		return "Whatever."
	}
}

// isYellingQuestion checks if the string is both yelling and a question.
// Kept for signature compatibility, though not directly used by Hey after optimization.
func isYellingQuestion(s string) bool {
	return isYelling(s) && isQuestion(s)
}

// isYelling checks if the string contains any letters and all letters are uppercase.
// This function is optimized to perform a single pass without intermediate string allocations.
func isYelling(s string) bool {
	hasLetter := false
	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				// Found a letter that is not uppercase, so it's definitely not yelling.
				return false
			}
		}
	}
	// If the loop completes without returning false, it means all letters found were uppercase.
	// The string is yelling only if it contained at least one letter.
	return hasLetter
}

// isQuestion checks if the string ends with a question mark.
func isQuestion(s string) bool {
	return strings.HasSuffix(s, "?")
}

// isEmpty checks if the string is empty.
func isEmpty(s string) bool {
	return s == ""
}