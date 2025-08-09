package bob

import (
	"strings"
	"unicode"
)

// remarkAnalysis holds properties derived from a string.
// This is an internal helper struct used for efficient one-pass analysis.
type remarkAnalysis struct {
	hasLetter          bool // True if the string contains at least one letter.
	allLettersAreUpper bool // True if all letters in the string are uppercase (vacuously true if no letters).
	endsWithQuestion   bool // True if the string ends with '?'.
}

// analyzeParsedRemark performs a single pass over a string to gather necessary properties.
// It assumes the input 's' is already trimmed (as 'parsed' is in Hey).
// This function aims to minimize iterations and allocations.
func analyzeParsedRemark(s string) remarkAnalysis {
	var analysis remarkAnalysis
	analysis.allLettersAreUpper = true // Assume true until a lowercase letter is found

	// Check if the string ends with '?'
	if len(s) > 0 && s[len(s)-1] == '?' {
		analysis.endsWithQuestion = true
	}

	// Iterate over runes to determine letter properties
	for _, r := range s {
		if unicode.IsLetter(r) {
			analysis.hasLetter = true
			if unicode.IsLower(r) {
				analysis.allLettersAreUpper = false
				// Optimization: If we've found a letter and a lowercase letter,
				// and `allLettersAreUpper` is now definitively false,
				// we don't need to check further for `allLettersAreUpper` or `hasLetter`.
				// However, we still need to iterate to correctly determine `endsWithQuestion` if it's
				// not already found at the end (which it is, so no early exit here if the string is long).
			}
		}
	}
	return analysis
}

// Hey returns a string with Bob's response.
func Hey(remark string) string {
	// Trim leading/trailing whitespace once.
	parsed := strings.TrimSpace(remark)

	if isEmpty(parsed) {
		return "Fine. Be that way!"
	}

	// Perform analysis on the trimmed string in a single pass.
	// This avoids multiple string iterations or intermediate string allocations
	// that would occur if `isYelling` and `isQuestion` were called independently
	// on `parsed` and each performed their own expensive operations.
	analysis := analyzeParsedRemark(parsed)

	// Determine original predicates based on analysis results
	// `isYelling` implies both `hasLetter` and `allLettersAreUpper` were true.
	isYellingVal := analysis.hasLetter && analysis.allLettersAreUpper
	// `isQuestion` implies `endsWithQuestion` was true on the trimmed string.
	isQuestionVal := analysis.endsWithQuestion

	// Apply Bob's original decision logic based on the pre-computed values.
	if isYellingVal && isQuestionVal { // Corresponds to isYellingQuestion(parsed)
		return "Calm down, I know what I'm doing!"
	} else if isQuestionVal { // Corresponds to isQuestion(parsed)
		return "Sure."
	} else if isYellingVal { // Corresponds to isYelling(parsed)
		return "Whoa, chill out!"
	} else {
		return "Whatever."
	}
}

// isEmpty checks if a string is empty.
// This function remains unchanged as it is already optimal.
func isEmpty(s string) bool {
	return s == ""
}

// isYelling checks if the remark is yelling.
// This function's original behavior implicitly ignored leading/trailing spaces
// and non-letter characters when determining if all letters were uppercase
// and if any letters were present. To preserve this behavior if called externally,
// it now trims the string and uses the optimized analysis.
func isYelling(s string) bool {
	trimmedS := strings.TrimSpace(s)
	analysis := analyzeParsedRemark(trimmedS)
	return analysis.hasLetter && analysis.allLettersAreUpper
}

// isQuestion checks if the remark is a question.
// This function's original behavior checked for a suffix without prior trimming.
// While `Hey` calls it with a trimmed string, its standalone behavior for "What? "
// should remain `false`. Therefore, it does not perform its own trimming.
// This function remains unchanged as it is already optimal for its original contract.
func isQuestion(s string) bool {
	return strings.HasSuffix(s, "?")
}

// isYellingQuestion checks if the remark is both yelling and a question.
// This function's signature and logic are preserved. Its performance improves
// implicitly because `isYelling` is optimized.
func isYellingQuestion(s string) bool {
	return isYelling(s) && isQuestion(s)
}

// removeNonLetters returns a new string with non-letter characters removed.
// This function's signature and functionality are preserved.
// While no longer directly used by the optimized `isYelling` within `Hey`'s
// flow, it remains available for external calls. `strings.Map` is an
// idiomatic and reasonably efficient way to achieve this.
func removeNonLetters(s string) string {
	return strings.Map(func(r rune) rune {
		if unicode.IsLetter(r) {
			return r
		}
		return -1 // -1 means discard the rune
	}, s)
}