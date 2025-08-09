#include "bob.h"
#include <ctype.h>
#include <stdbool.h> // For using bool type

const char *hey_bob(char *statement) {
    bool has_letters = false;
    bool has_uppercase = false;
    bool has_lowercase = false;
    bool has_any_non_space_char = false;
    char last_non_space_char = '\0'; // Stores the last character encountered that wasn't whitespace

    char c;
    for (int i = 0; (c = statement[i]) != '\0'; i++) {
        if (!isspace(c)) {
            has_any_non_space_char = true;
            last_non_space_char = c; // Update last non-space character
        }

        if (isalpha(c)) {
            has_letters = true; // Indicates we found at least one letter
            if (isupper(c)) {
                has_uppercase = true;
            } else { // if it's alphabetic but not uppercase, it must be lowercase
                has_lowercase = true;
            }
        }
    }

    // Determine the response based on the collected characteristics
    bool is_yelling = has_uppercase && !has_lowercase;
    bool is_question = (last_non_space_char == '?');

    if (!has_any_non_space_char) {
        // Case: The string is empty or contains only whitespace characters.
        return "Fine. Be that way!";
    } else if (is_yelling) {
        // Case: Contains at least one uppercase letter and no lowercase letters.
        // Yelling takes precedence over questions (e.g., "HI?")
        return "Whoa, chill out!";
    } else if (is_question) {
        // Case: Ends with '?' and is not a yell (checked by precedence above).
        return "Sure.";
    } else {
        // Case: All other scenarios, including mixed case, non-alphabetic, etc.
        return "Whatever.";
    }
}