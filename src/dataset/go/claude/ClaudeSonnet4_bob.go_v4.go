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

	hasLetter := false
	isUpper := true
	
	for _, r := range parsed {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				isUpper = false
				break
			}
		}
	}

	isYelling := hasLetter && isUpper
	isQuestion := strings.HasSuffix(parsed, "?")

	if isYelling && isQuestion {
		return "Calm down, I know what I'm doing!"
	} else if isQuestion {
		return "Sure."
	} else if isYelling {
		return "Whoa, chill out!"
	} else {
		return "Whatever."
	}
}

func isYellingQuestion(s string) bool {
	return isYelling(s) && isQuestion(s)
}

func isYelling(s string) bool {
	hasLetter := false
	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				return false
			}
		}
	}
	return hasLetter
}

func isQuestion(s string) bool {
	return strings.HasSuffix(s, "?")
}

func isEmpty(s string) bool {
	return s == ""
}

func removeNonLetters(s string) string {
	return strings.Map(func(r rune) rune {
		if unicode.IsLetter(r) {
			return r
		}
		return -1
	}, s)
}