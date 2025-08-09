package bob

import (
	"strings"
	"unicode"
)

func preProcess(s string) string {
	// Simplified to directly return the trimmed string.
	// strings.TrimSpace efficiently handles cases where no trimming is needed,
	// potentially avoiding new allocations.
	return strings.TrimSpace(s)
}

func IsAllUpper(s string) bool {
	hasLetter := false
	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true
			// If a letter is found and it's not uppercase, then it's not "all upper".
			if !unicode.IsUpper(r) {
				return false
			}
		}
	}
	// Return true only if at least one letter was found AND all found letters were uppercase.
	// This correctly handles strings with no letters (e.g., "123", "!!!") by returning false.
	return hasLetter
}

func IsQuestion(s string) bool {
	// This is already efficient, checking only the last character.
	return s[len(s)-1] == '?'
}

func Hey(remark string) string {
	// Pre-process the remark to handle leading/trailing spaces.
	remark = preProcess(remark)

	// Check if silence (empty string after trimming).
	if len(remark) == 0 {
		return "Fine. Be that way!"
	}

	// Evaluate conditions once to avoid redundant calls or complex nested logic.
	isQuestion := IsQuestion(remark)
	isAllUpper := IsAllUpper(remark)

	// Apply conversational rules based on the evaluated conditions.
	if isQuestion {
		if isAllUpper {
			return "Calm down, I know what I'm doing!"
		} else {
			return "Sure."
		}
	} else {
		if isAllUpper {
			return "Whoa, chill out!"
		} else {
			return "Whatever."
		}
	}
}