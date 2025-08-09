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
	return len(s) > 0 && s[len(s)-1] == '?'
}

func Hey(remark string) string {
	remark = strings.TrimSpace(remark)

	if len(remark) == 0 {
		return "Fine. Be that way!"
	}

	isQuestion := len(remark) > 0 && remark[len(remark)-1] == '?'
	
	hasLetter := false
	isAllUpper := true
	for _, r := range remark {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				isAllUpper = false
				break
			}
		}
	}
	isYelling := hasLetter && isAllUpper

	if isQuestion && isYelling {
		return "Calm down, I know what I'm doing!"
	} else if isQuestion {
		return "Sure."
	} else if isYelling {
		return "Whoa, chill out!"
	} else {
		return "Whatever."
	}
}