#include "bob.h"
#include <ctype.h>
#include <stdbool.h> // For bool type

#define SURE 	"Sure."
#define WHOA 	"Whoa, chill out!"
#define FINE 	"Fine. Be that way!"
#define WTEVER 	"Whatever."

/**
 * hey_bob: Analyzes the input sentence in a single pass
 * to determine Bob's response based on a set of rules.
 *
 * Rules priority:
 * 1. Silence/Empty: If the sentence contains only whitespace or is empty.
 * 2. Yelling: If the sentence contains any alphabetic characters and all of them are uppercase.
 * 3. Question: If the last non-whitespace character is a question mark.
 * 4. Something: Default response if none of the above rules apply.
 *
 * @param sentence The input string to analyze.
 * @return A constant string literal representing Bob's response.
 */
char *hey_bob(const char *sentence)
{
	// Rule 0: Handle NULL input
	if (sentence == NULL)
		return (char*) FINE;

	bool has_letter = false;        // True if any alphabetic character is found
	bool has_lowercase = false;     // True if any lowercase character is found
	bool has_non_whitespace = false; // True if any non-whitespace character is found
	char last_non_whitespace_char = ' '; // Stores the last non-whitespace character encountered

	// Iterate through the sentence once to collect necessary information
	for (const char *p = sentence; *p != '\0'; ++p) {
		if (!isspace((unsigned char)*p)) { // Cast to unsigned char for isspace() safety
			has_non_whitespace = true;
			last_non_whitespace_char = *p; // Update the last non-whitespace character

			if (isalpha((unsigned char)*p)) { // Cast for isalpha() safety
				has_letter = true;
				if (islower((unsigned char)*p)) { // Cast for islower() safety
					has_lowercase = true;
				}
			}
		}
	}

	// Apply Bob's rules based on the collected flags and characters
	// The order of these checks is crucial for determining the correct response priority.

	// Rule 1: Silence (string is empty or contains only whitespace)
	// This condition checks if no non-whitespace characters were encountered.
	if (!has_non_whitespace) {
		return (char*) FINE;
	}

	// Rule 2: Yelling (has letters, and all letters are uppercase)
	// This implies `has_letter` is true AND `has_lowercase` is false.
	// This check comes before "Question" because yelling questions ("HOW ARE YOU?") are yelling.
	if (has_letter && !has_lowercase) {
		return (char*) WHOA;
	}

	// Rule 3: Question (ends with '?')
	// This means the last non-whitespace character was a question mark.
	if (last_non_whitespace_char == '?') {
		return (char*) SURE;
	}

	// Rule 4: Something (default case)
	return (char*) WTEVER;
}