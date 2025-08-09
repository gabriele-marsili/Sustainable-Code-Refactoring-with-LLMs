#include "bob.h"
#include <ctype.h>
#include <stddef.h>
#include <stdbool.h> // For boolean types

#define SURE 	"Sure."
#define WHOA 	"Whoa, chill out!"
#define FINE 	"Fine. Be that way!"
#define WTEVER 	"Whatever."

/**
 * hey_bob: Determines Bob's response based on the input sentence.
 *
 * This function processes the sentence in a single pass to collect
 * necessary information (last non-whitespace character, total alphabetic
 * characters, and presence of any lowercase alphabetic characters).
 * This single pass minimizes execution time and resource usage by avoiding
 * multiple string traversals. The use of boolean flags streamlines the logic
 * for determining "yelling" vs "not yelling" conditions efficiently.
 *
 * @param sentence The input string to analyze.
 * @return A string literal corresponding to Bob's response.
 */
char *hey_bob(const char *sentence)
{
    // Handle NULL sentence case immediately. This is an explicit early exit.
    if (sentence == NULL) {
        return (char*) FINE;
    }

    const char *current_char_ptr = sentence; // Pointer to iterate through the sentence
    int alpha_char_count = 0;              // Counts total alphabetic characters
    bool found_lowercase_alpha = false;    // True if any lowercase alphabetic char is found
    char last_non_whitespace_char = ' ';   // Stores the last non-whitespace character encountered

    // Iterate through the sentence once to collect all necessary information.
    // This single pass is crucial for minimizing execution time.
    while (*current_char_ptr) {
        // If the current character is not whitespace, update the last non-whitespace character.
        // This ensures 'last_non_whitespace_char' correctly reflects the last significant character.
        if (!isspace(*current_char_ptr)) {
            last_non_whitespace_char = *current_char_ptr;

            // If the character is alphabetic, increment count and check for lowercase.
            // Using `islower` to set a boolean flag is more efficient for the "yelling" check
            // than counting both uppercase and lowercase separately.
            if (isalpha(*current_char_ptr)) {
                alpha_char_count++;
                if (islower(*current_char_ptr)) {
                    found_lowercase_alpha = true; // Mark that a lowercase char was found
                }
            }
        }
        current_char_ptr++; // Move to the next character in the string.
    }

    // Determine the response based on the collected information.
    // The order of these checks is crucial to match the specified original behavior,
    // especially for cases that might satisfy multiple conditions (e.g., "WHAT?!").

    // 1. Yelling: Contains at least one alphabetic character, and all alphabetic characters are uppercase.
    //    This is true if 'alpha_char_count' is greater than zero AND no lowercase alphabetic character was found.
    if (alpha_char_count > 0 && !found_lowercase_alpha) {
        return (char*) WHOA;
    }

    // 2. Question: The last non-whitespace character in the sentence is a question mark.
    if (last_non_whitespace_char == '?') {
        return (char*) SURE;
    }

    // 3. Silence: The sentence is empty or contains only whitespace characters.
    //    This condition is met if 'last_non_whitespace_char' remains ' ', indicating
    //    no non-whitespace characters were ever encountered.
    if (last_non_whitespace_char == ' ') {
        return (char*) FINE;
    }

    // 4. Whatever: For all other cases that don't fit the above criteria.
    return (char*) WTEVER;
}