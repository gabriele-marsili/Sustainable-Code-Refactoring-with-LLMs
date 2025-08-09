#include "bob.h"
#include <string>   // For std::string
#include <cctype>   // For std::isalpha, std::islower

// The bob::hey function determines a response based on the input string,
// adhering to a specific set of rules and their priorities.
// The optimization focuses on efficiency, minimal resource usage, and clean code.
string bob::hey(string input)
{
    // Step 1: Trim trailing whitespace to determine the "effective" length of the string.
    // This avoids creating a new string copy, optimizing memory and CPU usage.
    // 'n' will represent the length of the string, excluding any trailing spaces.
    size_t n = input.size();
    while (n > 0 && input[n - 1] == ' ') {
        n--;
    }

    // Rule 1: Handle empty or whitespace-only strings.
    // If 'n' is 0 after trimming, the string is effectively empty.
    if (n == 0) {
        return "Fine. Be that way!";
    }

    // Initialize flags for character analysis.
    // 'isShouting' tracks if all encountered letters are uppercase.
    // 'hasLetter' tracks if at least one alphabetic character has been found.
    bool isShouting = true;
    bool hasLetter = false;

    // Step 2: Iterate through the string up to the effective length 'n' to
    // determine 'isShouting' and 'hasLetter' flags in a single pass.
    for (size_t i = 0; i < n; ++i) {
        // Cast character to unsigned char. This is a crucial best practice for
        // <cctype> functions (like isalpha, islower) to prevent undefined behavior
        // if char is signed and holds a negative value outside the valid range (0-255).
        unsigned char ch = static_cast<unsigned char>(input[i]);

        // Check if the current character is an alphabet letter.
        if (std::isalpha(ch)) {
            hasLetter = true; // At least one letter found.

            // If a lowercase letter is found, the string is definitively not shouting.
            // Since `islower(ch)` implies `isalpha(ch)`, `hasLetter` is already true here.
            // As 'isShouting' is now false and 'hasLetter' is true, the "shouting" condition
            // (`hasLetter && isShouting`) will always be false for the rest of the string.
            // Therefore, we can break early to save CPU cycles.
            if (std::islower(ch)) {
                isShouting = false;
                break; // Optimization: early exit as shouting condition cannot be met.
            }
            // If the character is an uppercase letter, `isShouting` remains true (if it was already true).
            // No explicit action is needed here.
        }
        // Non-alphabetic characters (e.g., numbers, symbols, spaces) do not affect `isShouting`
        // in the context of determining if letters are all uppercase.
    }

    // Rule 2: Handle shouting strings.
    // A string is "shouting" if it contains at least one letter AND all its letters are uppercase.
    // This check takes precedence over the question mark rule (e.g., "HOW ARE YOU?").
    if (hasLetter && isShouting) {
        return "Whoa, chill out!";
    }

    // Rule 3: Handle questions.
    // If the last non-whitespace character is a question mark, respond with "Sure.".
    // 'n' accurately points to the last relevant character for this check.
    if (input[n - 1] == '?') {
        return "Sure.";
    }

    // Rule 4: Default response.
    // If none of the specific rules above apply, return the default response.
    return "Whatever.";
}