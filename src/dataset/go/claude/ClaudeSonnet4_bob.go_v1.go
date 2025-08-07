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

func isYellingQuestion(s string) bool {
	return isYelling(s) && isQuestion(s)
}

func isYelling(s string) bool {
	hasLetters := false
	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetters = true
			if !unicode.IsUpper(r) {
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

func removeNonLetters(s string) string {
	return strings.Map(func(r rune) rune {
		if unicode.IsLetter(r) {
			return r
		}
		return -1
	}, s)
}