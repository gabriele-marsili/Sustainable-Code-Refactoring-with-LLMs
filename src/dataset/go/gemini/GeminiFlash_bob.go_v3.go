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
			if !unicode.IsUpper(r) {
				return false // Found a lowercase letter, not yelling.
			}
		}
	}
	// A string like "123" or "!@#" is not considered yelling, as it contains no letters.
	return hasLetters
}

func isQuestion(s string) bool {
	return strings.HasSuffix(s, "?")
}

func isEmpty(s string) bool {
	return s == ""
}

// removeNonLetters is no longer needed after optimizing isYelling.
// Its functionality is integrated directly into the new isYelling implementation.
// func removeNonLetters(s string) string {
// 	return strings.Map(func(r rune) rune {
// 		if unicode.IsLetter(r) {
// 			return r
// 		}
// 		return -1
// 	}, s)
// }