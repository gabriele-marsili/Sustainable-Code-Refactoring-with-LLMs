#include "bob.h"
#include <stdbool.h> // For bool type
#include <string.h>  // For strlen
#include <ctype.h>   // For isspace, islower, isupper

// Function to check if a string ends with a question mark after trimming trailing spaces.
// This function calculates the string length once using strlen and then efficiently
// iterates backwards to find the last non-whitespace character.
bool ends_with_question_mark(char *chr) {
    size_t len = strlen(chr); // Calculate length of the string once.
    if (len == 0) {
        return false; // An empty string cannot end with a question mark.
    }

    // Iterate backwards from the end of the string to find the last non-whitespace character.
    // 'i' will be the index of this character.
    // The loop condition 'i > 0' ensures we don't underflow for strings like " ".
    size_t i = len - 1;
    while (i > 0 && isspace(chr[i])) {
        i--;
    }
    // After the loop, 'i' points to the last non-whitespace character,
    // or to chr[0] if the string was entirely whitespace or a single character.
    return chr[i] == '?';
}

// Function to check if a string contains only capital letters (and potentially non-letters),
// and at least one capital letter.
// This function uses ctype.h functions for robust and potentially optimized character classification.
bool has_all_capital_letters(char *chr) {
    bool has_uppercase_letter = false; // Flag to track if at least one uppercase letter is found.
    while (*chr != '\0') {
        if (islower(*chr)) {
            // Found a lowercase letter, so it's not "all capital letters".
            return false; // Short-circuit: no need to check further.
        } else if (isupper(*chr)) {
            // Found an uppercase letter.
            has_uppercase_letter = true;
        }
        // If the character is not an alphabetic letter (e.g., digit, punctuation, space),
        // it does not invalidate the "all capital letters" condition, but also doesn't
        // contribute to `has_uppercase_letter`.
        chr++;
    }
    // Return true only if at least one uppercase letter was found AND no lowercase letters were found.
    return has_uppercase_letter;
}

// Function to check if a string contains only whitespace characters or is empty.
// This function uses the idiomatic C way to check the return of isspace.
bool silent_message(char *chr) {
    while (*chr != '\0') {
        if (!isspace(*chr)) {
            // Found a non-whitespace character, so it's not a silent message.
            return false; // Short-circuit: no need to check further.
        }
        chr++;
    }
    // If the loop completes, all characters were whitespace or the string was empty.
    return true;
}

// Main function to determine Bob's response based on the greeting properties.
// The function calls its helper functions sequentially, as required by the problem's
// preservation of function signatures. Each helper function is optimized internally.
char *hey_bob(char *greeting) {
    // Call helper functions to determine properties of the greeting.
    // Each function will iterate over the string, which is necessary to preserve function signatures.
    bool question = ends_with_question_mark(greeting);
    bool capital = has_all_capital_letters(greeting);
    bool silent = silent_message(greeting);

    // Apply the response logic based on the determined properties.
    if (question && !capital) {
        return "Sure."; // A question, but not yelling.
    } else if (!question && capital) {
        return "Whoa, chill out!"; // Yelling, but not a question.
    } else if (question && capital) {
        return "Calm down, I know what I'm doing!"; // A yelling question.
    } else if (silent) {
        return "Fine. Be that way!"; // All whitespace or empty string.
    } else {
        return "Whatever."; // Default response for other cases.
    }
}