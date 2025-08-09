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

func isYelling(s string) bool {
	hasLetters := false

	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetters = true
			if unicode.IsLower(r) {
				return false
			}
		}
	}
	return hasLetters
}

func isQuestion(s string) bool {
	return strings.HasSuffix(s, "?")
}

func isEmpty(s string) bool {
	return s == ""
}