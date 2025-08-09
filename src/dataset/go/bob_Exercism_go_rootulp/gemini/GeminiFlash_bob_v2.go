package bob

import (
	"strings"
	"unicode"
	"unicode/utf8"
)

// Hey returns a string with Bob's response.
func Hey(remark string) string {
	parsed := strings.TrimSpace(remark)

	// Rule 1: Empty remark
	if parsed == "" {
		return "Fine. Be that way!"
	}

	// Analyze the parsed remark in a single pass to collect all necessary flags
	hasLetter := false
	allLettersAreUpper := true // Assume true until a lowercase letter is found
	
	for _, r := range parsed {
		if unicode.IsLetter(r) {
			hasLetter = true
			if !unicode.IsUpper(r) {
				allLettersAreUpper = false // Found a lowercase letter
			}
		}
	}

	// Check if the last character of the trimmed remark is a question mark
	isQuestion := false
	// We already know parsed is not empty due to the first `if` statement.
	// utf8.DecodeLastRuneInString correctly handles multi-byte characters
	lastRune, _ := utf8.DecodeLastRuneInString(parsed)
	if lastRune == '?' {
		isQuestion = true
	}

	// Determine if it's yelling based on collected flags
	// It's yelling if it contains at least one letter AND all letters are uppercase.
	isYelling := hasLetter && allLettersAreUpper

	// Apply Bob's rules in order of precedence
	if isYelling && isQuestion {
		return "Calm down, I know what I'm doing!"
	} else if isQuestion {
		return "Sure."
	} else if isYelling {
		return "Whoa, chill out!"
	} else {
		return "Whatever."
	}
}