package bob

import (
	"strings"
	"unicode"
)

// preProcess removes leading and trailing whitespace from a string.
// It optimizes by directly returning the result of strings.TrimSpace,
// avoiding a redundant intermediate variable assignment.
func preProcess(s string) string {
	return strings.TrimSpace(s)
}

// IsAllUpper checks if a string contains at least one letter and all letters are uppercase.
// It iterates through the runes of the string, tracking if any letters are encountered.
// If a letter is found and it's not uppercase, it immediately returns false.
// If no letters are found in the string, it returns false (e.g., "123" is not all upper).
func IsAllUpper(s string) bool {
	hasLetter := false // Flag to track if at least one letter character is found
	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true // Mark that we've found at least one letter
			// If a letter is found but it's not uppercase, then it's not "all upper"
			if !unicode.IsUpper(r) {
				return false
			}
		}
		// Non-letter characters (like numbers, spaces, punctuation) do not affect
		// the "all upper" status, as long as all letters are uppercase.
	}
	// If the loop completes:
	// - If hasLetter is true, it means all letters found were uppercase. So, return true.
	// - If hasLetter is false, it means no letters were found in the string (e.g., "123", "!@#").
	//   In this case, it's not considered "all upper". So, return false.
	return hasLetter
}

// IsQuestion checks if a string ends with a question mark.
// It is optimized to work correctly with Unicode strings by iterating over runes
// to find the last character, without allocating a new []rune slice.
// The calling function Hey() ensures that 's' is not empty when this function is called.
func IsQuestion(s string) bool {
	var lastRune rune
	// Iterate through all runes to get the last one. This is Unicode-safe.
	// Hey() ensures s is not empty when calling this, so lastRune will be assigned.
	for _, r := range s {
		lastRune = r
	}
	// Check if the last rune is a question mark.
	return lastRune == '?'
}

// Hey responds to a remark based on its characteristics.
// It first pre-processes the remark by trimming whitespace.
// Then it applies Bob's specific rules:
// - Silence: "Fine. Be that way!"
// - Yelling a question: "Calm down, I know what I'm doing!"
// - Asking a question: "Sure."
// - Yelling: "Whoa, chill out!"
// - Anything else: "Whatever."
func Hey(remark string) string {
	// Pre-process the remark by trimming leading and trailing spaces.
	remark = preProcess(remark)

	// Check if the remark is empty (silence).
	if len(remark) == 0 {
		return "Fine. Be that way!"
	}

	// Determine if the remark is a question and if it's all uppercase.
	isQuestion := IsQuestion(remark)
	isAllUpper := IsAllUpper(remark)

	// Apply Bob's logic based on the characteristics of the remark.
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