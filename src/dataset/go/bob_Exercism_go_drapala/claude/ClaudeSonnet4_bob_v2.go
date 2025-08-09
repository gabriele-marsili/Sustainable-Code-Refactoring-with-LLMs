package bob

import (
	"strings"
	"unicode"
)

func Hey(remark string) string {
	// Pre-process the remark
	remark = strings.TrimSpace(remark)

	// Check if silence
	if len(remark) == 0 {
		return "Fine. Be that way!"
	}

	// Check if question and uppercase in single pass
	isQuestion := remark[len(remark)-1] == '?'
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

	// If no letters found, it's not uppercase
	if !hasLetter {
		isAllUpper = false
	}

	if isQuestion {
		if isAllUpper {
			return "Calm down, I know what I'm doing!"
		}
		return "Sure."
	}

	if isAllUpper {
		return "Whoa, chill out!"
	}
	return "Whatever."
}