#include "bob.h"
#include <ctype.h>   // For isalpha, isupper, islower, isspace
#include <stdbool.h> // For bool type

const char *hey_bob(char *statement) {
    bool has_letters = false;
    bool has_lower = false;
    bool has_upper = false;
    bool has_non_space = false;
    char last_non_space_char = '\0'; // Stores the last non-whitespace character encountered

    // Iterate through the statement once to collect all necessary properties
    for (int i = 0; statement[i] != '\0'; i++) {
        char c = statement[i];

        if (!isspace(c)) {
            has_non_space = true;
            last_non_space_char = c; // Update last non-space character
        }

        if (isalpha(c)) {
            has_letters = true; // Found at least one letter
            if (isupper(c)) {
                has_upper = true; // Found at least one uppercase letter
            } else {
                has_lower = true; // Found at least one lowercase letter
            }
        }
    }

    // Apply Bob's rules based on the collected properties.
    // The order of these checks is crucial to match the original code's priority.

    // 1. "Fine. Be that way!" - If nothing is said (empty or all whitespace)
    if (!has_non_space) {
        return "Fine. Be that way!";
    }

    // 2. "Whoa, chill out!" - If yelled.
    // A statement is considered a yell if it contains at least one uppercase letter,
    // and no lowercase letters. The presence of non-alphabetic characters (numbers, symbols)
    // does not prevent it from being a yell, as long as the letter conditions are met.
    // It must also contain at least one actual letter to be a yell (e.g., "123" is not a yell).
    if (has_upper && !has_lower && has_letters) {
        return "Whoa, chill out!";
    }

    // 3. "Sure." - If it's a question.
    // A question ends with '?' and is not a yell (if it were a yell, it would have returned already).
    if (last_non_space_char == '?') {
        return "Sure.";
    }

    // 4. "Whatever." - For anything else.
    // This covers mixed-case statements, statements with only numbers/symbols (not ending in '?'), etc.
    return "Whatever.";
}