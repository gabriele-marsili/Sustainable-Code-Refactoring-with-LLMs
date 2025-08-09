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
	return strings.HasSuffix(s, "?")
}

func Hey(remark string) string {
	remark = preProcess(remark)

	if remark == "" {
		return "Fine. Be that way!"
	}
	if IsQuestion(remark) {
		if IsAllUpper(remark) {
			return "Calm down, I know what I'm doing!"
		}
		return "Sure."
	}
	if IsAllUpper(remark) {
		return "Whoa, chill out!"
	}
	return "Whatever."
}