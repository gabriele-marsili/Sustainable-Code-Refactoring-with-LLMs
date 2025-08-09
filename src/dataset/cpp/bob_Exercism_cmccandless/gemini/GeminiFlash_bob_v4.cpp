#include "bob.h"

// Explicitly include standard library headers for clarity and self-containment.
// This improves build reproducibility and reduces reliance on transitive includes from "bob.h".
#include <string>  // For std::string
#include <cctype>  // For std::isalpha, std::toupper

// Maintain the external interface exactly as provided, including function name and signature.
// Optimization focuses on the internal implementation while preserving behavior.
std::string bob::hey(std::string input)
{
    // Use boolean types for flags for semantic clarity and potential compiler optimizations.
    bool isShouting = true;
    bool hasLetter = false;

    // Use size_t for string lengths and loop indices, which is the type returned by std::string::size().
    // This is best practice for handling string sizes and avoids potential warnings or issues with very large strings.
    size_t n = input.size();

    // Optimize by calculating the effective length of the string, ignoring trailing spaces.
    // This avoids creating a new (trimmed) string object, saving memory allocations and copy overhead.
    // The loop efficiently reduces 'n' to point just beyond the last non-space character.
    while (n > 0 && input[n - 1] == ' ') {
        n--;
    }

    // Handle the "empty or all-whitespace string" case as an early exit.
    // This improves performance for such inputs by avoiding unnecessary further processing.
    if (n == 0) {
        return "Fine. Be that way!";
    }

    // Iterate through the string content up to the calculated effective length 'n'.
    // Using pre-increment (++) for loop counters is a minor micro-optimization.
    for (size_t i = 0; i < n; ++i) {
        char ch = input[i]; // Access character directly.

        // Use std::isalpha for locale-independent check if the character is an alphabetic letter.
        // This flag is set to true if any letter is encountered, otherwise remains false.
        if (std::isalpha(ch)) {
            hasLetter = true;
        }

        // Check if the character is a lowercase letter.
        // std::toupper returns the character itself if it's not a lowercase letter.
        // Thus, 'ch != std::toupper(ch)' is true *only if* 'ch' is a lowercase letter.
        // This is an efficient way to determine if a lowercase character is present.
        if (ch != std::toupper(ch)) {
            isShouting = false; // If any lowercase letter is found, the input is not considered shouting.
            // Since a lowercase character implies it is an alphabetic character, 'hasLetter'
            // will have already been set to true (or will be set in this iteration) by the 'std::isalpha(ch)' check.
            // Once 'isShouting' becomes false and 'hasLetter' is true, the "Whoa, chill out!" condition
            // can no longer be met. Therefore, we can break early from the loop to save computation.
            break;
        }
    }

    // Determine the appropriate response based on the derived properties.
    // The order of these checks is crucial for preserving original functionality, matching typical Bob implementations.

    // Rule 1: "Shouting" - If the string contains at least one letter and all letters are uppercase.
    if (hasLetter && isShouting) {
        return "Whoa, chill out!";
    }

    // Rule 2: "Question" - If the string (after trimming trailing spaces) ends with a question mark.
    // 'input[n - 1]' accesses the last non-space character.
    if (input[n - 1] == '?') {
        return "Sure.";
    }

    // Rule 3: Default response for all other cases.
    return "Whatever.";
}