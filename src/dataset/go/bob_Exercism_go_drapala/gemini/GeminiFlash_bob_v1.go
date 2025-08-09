package bob

import (
	"strings"
	"unicode"
)

func preProcess(s string) string {
	return strings.TrimSpace(s)
}

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
	return s[len(s)-1] == '?'
}

func Hey(remark string) string {
	remark = preProcess(remark)

	if len(remark) == 0 {
		return "Fine. Be that way!"
	}

	isQuestion := IsQuestion(remark)
	isShouting := IsAllUpper(remark)

	if isQuestion {
		if isShouting {
			return "Calm down, I know what I'm doing!"
		} else {
			return "Sure."
		}
	} else {
		if isShouting {
			return "Whoa, chill out!"
		} else {
			return "Whatever."
		}
	}
}