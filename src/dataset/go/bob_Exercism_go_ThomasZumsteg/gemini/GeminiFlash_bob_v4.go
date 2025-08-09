package bob

import (
	"strings"
	"unicode"
)

// TestVersion is the test suite that this will pass
const TestVersion = 1

/*Hey responds to a greeting like a lackadaisical teenager.*/
func Hey(greeting string) string {
	// Trim leading/trailing whitespace from the greeting.
	// This creates a new string only if trimming is necessary.
	trimmedGreeting := strings.TrimSpace(greeting)

	// Case 1: Empty string or string containing only whitespace.
	if trimmedGreeting == "" {
		return "Fine. Be that way!"
	}

	// Optimize character analysis: Instead of potentially iterating over the string
	// multiple times with helper functions, perform a single pass over the trimmed
	// string to gather all necessary character properties for the "shouting"
	// and "question" checks. This reduces CPU cycles and improves cache locality.
	foundUpper := false  // True if any uppercase letter is found
	foundLower := false  // True if any lowercase letter is found
	hasLetter := false   // True if the string contains any actual letters (A-Z, a-z, etc.)
	var lastRune rune    // Stores the last rune encountered in the string

	for _, r := range trimmedGreeting {
		if unicode.IsLetter(r) {
			hasLetter = true
			if unicode.IsUpper(r) {
				foundUpper = true
			} else if unicode.IsLower(r) {
				foundLower = true
			}
		}
		lastRune = r // Update lastRune with the current rune in the trimmed string
	}

	// Determine if it's a shouting message:
	// It must contain at least one letter,
	// contain at least one uppercase letter, AND
	// contain no lowercase letters.
	isShouting := hasLetter && foundUpper && !foundLower

	// Determine if it's a question:
	// The last meaningful character (after trimming) is a question mark.
	isQuestion := lastRune == '?'

	// Apply the response rules based on the order of precedence from the original code.
	switch {
	case isShouting:
		return "Whoa, chill out!"
	case isQuestion:
		return "Sure."
	default:
		return "Whatever."
	}
}

// The original 'any' helper function is no longer needed as its functionality
// has been inlined and optimized within the Hey function. Since 'any' was
// an unexported helper (not part of the package's external interface),
// its removal does not alter the external API, maintaining the specified constraints.