package bob

import (
	"strings"
	"unicode"
)

func IsAllUpper(s string) bool {
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

func IsQuestion(s string) bool {
	return strings.HasSuffix(s, "?")
}

func Hey(remark string) string {
	remark = strings.TrimSpace(remark)

	if remark == "" {
		return "Fine. Be that way!"
	}

	isQuestion := IsQuestion(remark)
	isShouting := IsAllUpper(remark)

	switch {
	case isQuestion && isShouting:
		return "Calm down, I know what I'm doing!"
	case isQuestion:
		return "Sure."
	case isShouting:
		return "Whoa, chill out!"
	default:
		return "Whatever."
	}
}