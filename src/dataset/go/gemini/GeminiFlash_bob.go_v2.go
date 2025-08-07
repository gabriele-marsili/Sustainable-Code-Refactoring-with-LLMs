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
	} else if isYellingQuestion(parsed) {
		return "Calm down, I know what I'm doing!"
	} else if isQuestion(parsed) {
		return "Sure."
	} else if isYelling(parsed) {
		return "Whoa, chill out!"
	} else {
		return "Whatever."
	}
}

func isYellingQuestion(s string) bool {
	return isYelling(s) && isQuestion(s)
}

// isYelling checks if the string contains at least one letter and all letters are uppercase.
// This function is optimized to perform a single pass over the string
// and avoids creating new strings, significantly reducing memory allocations and CPU cycles.
func isYelling(s string) bool {
	hasLetter := false
	allLettersAreUpper := true

	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				allLettersAreUpper = false
				// No need to break here. We need to ensure hasLetter is correctly set
				// for the entire string, even if we've already found a lowercase letter.
				// The final return will correctly evaluate to false if allLettersAreUpper is false.
			}
		}
	}
	return hasLetter && allLettersAreUpper
}

func isQuestion(s string) bool {
	return strings.HasSuffix(s, "?")
}

func isEmpty(s string) bool {
	return s == ""
}

// removeNonLetters function was removed as its functionality was integrated
// and optimized directly into the isYelling function.