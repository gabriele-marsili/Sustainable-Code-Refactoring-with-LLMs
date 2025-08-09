package bob

import (
	"strings"
	"unicode"
)

// preProcess removes leading and trailing whitespace from the remark.
// It directly uses strings.TrimSpace, which is an efficient standard library function.
func preProcess(s string) string {
	return strings.TrimSpace(s)
}

// IsAllUpper checks if the string contains at least one letter, and all letters are uppercase.
// It iterates once and uses a flag to track if any letter was found.
func IsAllUpper(s string) bool {
	hasLetter := false
	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				return false // Found a letter that is not uppercase, so it's not "all upper"
			}
		}
		// Non-letter characters (numbers, symbols, spaces) do not affect
		// the "all upper" status, as long as there's at least one upper letter present.
	}
	// A string is considered "all upper" only if it contains at least one letter,
	// and all those letters are uppercase.
	return hasLetter
}

// IsQuestion checks if the remark ends with a question mark.
// It safely accesses the last character as Hey ensures the string is not empty.
func IsQuestion(s string) bool {
	return s[len(s)-1] == '?'
}

// Hey responds to a remark based on its characteristics.
// It processes the remark, then applies a set of rules to determine the appropriate response.
func Hey(remark string) string {
	// Pre-process the remark to remove leading/trailing spaces
	remark = preProcess(remark)

	// Check if silence
	if len(remark) == 0 {
		return "Fine. Be that way!"
	}

	isQuestion := IsQuestion(remark)
	isAllUpper := IsAllUpper(remark)

	// Check if question
	if isQuestion {
		// Check if uppercase
		if isAllUpper {
			return "Calm down, I know what I'm doing!"
		}
		return "Sure."
	}

	// Check if uppercase
	if isAllUpper {
		return "Whoa, chill out!"
	}
	return "Whatever."
}