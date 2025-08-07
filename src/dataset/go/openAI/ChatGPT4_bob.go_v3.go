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

	isYelling := hasLetter && isAllUpper

	switch {
	case isYelling && isQuestion:
		return "Calm down, I know what I'm doing!"
	case isQuestion:
		return "Sure."
	case isYelling:
		return "Whoa, chill out!"
	default:
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
	var b strings.Builder
	for _, r := range s {
		if unicode.IsLetter(r) {
			b.WriteRune(r)
		}
	}
	return b.String()
}