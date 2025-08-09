#include "bob.h"
#include <string>   // Required for std::string
#include <cctype>   // Required for std::isalpha, std::islower

std::string bob::hey(std::string input)
{
    // Use std::string::size_type for string lengths and indices for type safety
    // and to avoid potential issues with very long strings on 32-bit systems.
    std::string::size_type n = input.size();

    // 1. Trim trailing whitespace: Adjust 'n' to be the length of the string
    //    without trailing spaces. This avoids iterating over them.
    while (n > 0 && input[n - 1] == ' ') {
        n--;
    }

    // 2. Handle empty or all-whitespace input early.
    //    This is the most efficient check if it's the dominant case.
    if (n == 0) {
        return "Fine. Be that way!";
    }

    // 3. Determine if the message is shouting and if it contains any letters.
    //    Initialize flags.
    bool isShouting = true;  // Assume shouting until a lowercase letter is found.
    bool hasLetter = false;  // Assume no letters until one is found.

    // Iterate through the significant part of the string (up to 'n').
    for (std::string::size_type i = 0; i < n; ++i) {
        // Cast character to unsigned char for cctype functions (e.g., isalpha, islower)
        // to prevent undefined behavior with negative char values on some systems.
        unsigned char ch = static_cast<unsigned char>(input[i]);

        if (std::isalpha(ch)) {
            // Found at least one alphabetic character.
            hasLetter = true;

            // Check if the letter is lowercase.
            if (std::islower(ch)) {
                // If a lowercase letter is found, it cannot be shouting.
                isShouting = false;

                // At this point, we've found a lowercase letter, so:
                // 1. hasLetter is true.
                // 2. isShouting is false.
                // No further iteration is needed to determine these flags.
                break; // Early exit from the loop for efficiency.
            }
        }
        // If 'ch' is not an alphabet character (e.g., number, symbol, space),
        // it does not affect 'hasLetter' (unless it was already true)
        // and does not make 'isShouting' false.
    }

    // 4. Evaluate the conditions in the specified order of precedence.

    // "Shouting" condition: Must contain at least one letter, and all letters must be uppercase.
    if (hasLetter && isShouting) {
        return "Whoa, chill out!";
    }

    // "Question" condition: The last non-whitespace character must be a question mark.
    if (input[n - 1] == '?') {
        return "Sure.";
    }

    // Default response if no other conditions are met.
    return "Whatever.";
}