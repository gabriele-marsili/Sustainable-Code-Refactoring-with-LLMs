package bob

import (
	"strings"
	"unicode"
)

// TestVersion is the test suite that this will pass
const TestVersion = 1

// isShouting determines if a string qualifies as a "shout".
// It checks if the string contains any letters, at least one uppercase letter,
// and no lowercase letters. This performs a single pass over the string,
// which is more efficient than separate passes for upper and lower case checks.
func isShouting(s string) bool {
	hasUpper := false
	hasLower := false
	hasLetter := false // To differentiate purely non-alphabetic strings (e.g., "!!!", "123") from shouts.

	for _, r := range s {
		if unicode.IsLetter(r) {
			hasLetter = true
			if unicode.IsUpper(r) {
				hasUpper = true
			} else if unicode.IsLower(r) {
				hasLower = true
			}
		}
	}
	// A string is shouting if it contains letters, has at least one uppercase letter,
	// and no lowercase letters.
	return hasLetter && hasUpper && !hasLower
}

/*Hey responds to a greeting like a lackadaisical teenager.*/
func Hey(greeting string) string {
	// Trim leading/trailing whitespace once to avoid redundant operations
	// and ensure consistent string comparison.
	trimmedGreeting := strings.TrimSpace(greeting)

	switch {
	// Case 1: Empty string (after trimming).
	// This must be checked first as other conditions might panic on an empty string.
	case trimmedGreeting == "":
		return "Fine. Be that way!"

	// Case 2: Shouting condition.
	// This uses the optimized `isShouting` helper function,
	// which processes the string in a single pass.
	case isShouting(trimmedGreeting):
		return "Whoa, chill out!"

	// Case 3: Question condition.
	// `strings.HasSuffix` is idiomatic and robust for checking the end of a string,
	// handling potential Unicode complexities better than direct index access,
	// although for a single ASCII character like '?' the performance difference is negligible.
	// This case is only reached if the string is not empty (handled by Case 1),
	// so it's safe to check for suffixes.
	case strings.HasSuffix(trimmedGreeting, "?"):
		return "Sure."

	// Default response for all other cases.
	default:
		return "Whatever."
	}
}

// The original 'any' function has been removed because its specific use case
// within `Hey` (for determining shouting) has been replaced by the more optimized
// `isShouting` function. Removing unused code reduces binary size and improves clarity.