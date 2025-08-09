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

	hasLetters := false
	isAllUpper := true
	isQuestionMark := strings.HasSuffix(parsed, "?")

	for _, r := range parsed {
		if unicode.IsLetter(r) {
			hasLetters = true
			if !unicode.IsUpper(r) {
				isAllUpper = false
				break
			}
		}
	}

	isYellingResult := hasLetters && isAllUpper

	if isYellingResult && isQuestionMark {
		return "Calm down, I know what I'm doing!"
	} else if isQuestionMark {
		return "Sure."
	} else if isYellingResult {
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
	var result strings.Builder
	for _, r := range s {
		if unicode.IsLetter(r) {
			result.WriteRune(r)
		}
	}
	return result.String()
}