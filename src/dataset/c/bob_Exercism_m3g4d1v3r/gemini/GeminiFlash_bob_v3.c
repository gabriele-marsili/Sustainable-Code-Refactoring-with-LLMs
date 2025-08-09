#include "bob.h" // Assuming this header defines bool and function prototypes
#include <string.h>  // For strlen
#include <ctype.h>   // For isspace, islower, isupper
#include <stdbool.h> // For bool type if not already defined in bob.h

/**
 * Checks if a string ends with a question mark, ignoring trailing whitespace.
 *
 * @param chr The string to check.
 * @return True if the effective end of the string is a question mark, false otherwise.
 */
bool ends_with_question_mark(char *chr) {
    size_t len = strlen(chr); // Get string length (single pass, often highly optimized)

    if (len == 0) {
        return false; // An empty string cannot end with a question mark
    }

    // Start from the character just before the null terminator and move backward,
    // skipping any trailing whitespace characters.
    size_t i = len;
    while (i > 0 && isspace(chr[i - 1])) {
        i--;
    }

    // If 'i' is 0, it means the string was either empty or contained only whitespace,
    // so there's no non-whitespace character to check.
    // Otherwise, chr[i-1] is the last non-whitespace character.
    return (i > 0 && chr[i - 1] == '?');
}

/**
 * Checks if a string contains at least one capital letter and no lowercase letters.
 * Non-alphabetic characters are ignored.
 *
 * @param chr The string to check.
 * @return True if all alphabetic characters are capital and at least one capital letter is present, false otherwise.
 */
bool has_all_capital_letters(char *chr) {
    bool capital_found = false; // Flag to track if any capital letter has been encountered

    // Iterate through the string character by character
    while (*chr != '\0') {
        if (islower(*chr)) {
            return false; // Found a lowercase letter, so not all letters are capital
        }
        if (isupper(*chr)) {
            capital_found = true; // Found an uppercase letter
        }
        // Non-alphabetic characters (digits, symbols, spaces) are skipped without affecting the flag.
        chr++;
    }

    // Returns true only if no lowercase letters were found throughout the string
    // AND at least one uppercase letter was found.
    // If the string contains no letters, capital_found remains false, which is correct
    // (a string with no letters does not "have all capital letters").
    return capital_found;
}

/**
 * Checks if a string contains only whitespace characters or is empty.
 *
 * @param chr The string to check.
 * @return True if the string is silent (all whitespace or empty), false otherwise.
 */
bool silent_message(char *chr) {
    // Iterate through the string character by character
    while (*chr != '\0') {
        if (!isspace(*chr)) {
            return false; // Found a non-whitespace character, so it's not silent
        }
        chr++;
    }
    return true; // All characters were whitespace or the string was empty
}

/**
 * Determines Bob's response based on the characteristics of the greeting message.
 *
 * @param greeting The message received by Bob.
 * @return A string literal representing Bob's response.
 */
char *hey_bob(char *greeting) {
    // Call the helper functions to determine the message characteristics.
    // The problem requires preserving the function names and signatures,
    // implying these helper calls are part of the intended structure.
    bool question = ends_with_question_mark(greeting);
    bool capital = has_all_capital_letters(greeting);
    bool silent = silent_message(greeting);

    // Evaluate the conditions in the specified order to determine Bob's response.
    if (question && !capital) {
        return "Sure."; // A question that is not shouted
    } else if (!question && capital) {
        return "Whoa, chill out!"; // A shouted statement
    } else if (question && capital) {
        return "Calm down, I know what I'm doing!"; // A shouted question
    } else if (silent) {
        return "Fine. Be that way!"; // An empty or all-whitespace message
    } else {
        return "Whatever."; // Any other message (a regular statement)
    }
}