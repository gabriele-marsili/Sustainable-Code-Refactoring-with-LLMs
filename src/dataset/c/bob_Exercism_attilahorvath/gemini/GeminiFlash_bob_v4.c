#include "bob.h"
#include <ctype.h>
#include <stdbool.h>

const char *hey_bob(char *statement) {
    bool has_uppercase_letters = false;
    bool has_lowercase_letters = false;
    bool has_non_space_chars = false;
    char last_non_space_char = '\0'; // Sentinel value to indicate no non-space char found yet

    char c;
    for (int i = 0; (c = statement[i]) != '\0'; i++) {
        if (!isspace(c)) {
            has_non_space_chars = true;
            last_non_space_char = c;
        }

        if (isalpha(c)) {
            if (isupper(c)) {
                has_uppercase_letters = true;
            } else { // If it's alphabetic and not uppercase, it must be lowercase
                has_lowercase_letters = true;
            }
        }
    }

    // Determine the characteristics based on the collected flags
    bool is_yell = has_uppercase_letters && !has_lowercase_letters;
    bool is_question = (last_non_space_char == '?');
    bool is_silence = !has_non_space_chars;

    // Apply the response rules in their priority order
    if (is_yell) {
        return "Whoa, chill out!";
    }
    if (is_question) { // This branch is only reached if 'is_yell' is false
        return "Sure.";
    }
    if (is_silence) { // This branch is only reached if 'is_yell' and 'is_question' are false
        return "Fine. Be that way!";
    }

    // Default response for all other cases
    return "Whatever.";
}