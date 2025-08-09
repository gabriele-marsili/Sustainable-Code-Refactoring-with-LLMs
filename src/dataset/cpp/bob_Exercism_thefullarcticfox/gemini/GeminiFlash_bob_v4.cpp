#include "bob.h" // Keep original includes

#include <string>   // For std::string and string manipulation
#include <cctype>   // For std::islower, std::isupper, etc.

namespace bob {
    // Optimized has_only_caps_letters function
    // This function checks if a string contains only uppercase letters (and optionally other characters)
    // and contains at least one letter.
    bool has_only_caps_letters(const std::string& str) {
        bool found_uppercase_letter = false; // Flag to track if at least one uppercase letter is found

        for (char c : str) {
            // Use static_cast<unsigned char>(c) for character classification functions
            // to prevent undefined behavior with negative char values (if char is signed)
            // and ensure correct operation with all possible char values.
            if (std::islower(static_cast<unsigned char>(c))) {
                return false; // Found a lowercase letter, so it's not all caps. Early exit for performance.
            }
            if (std::isupper(static_cast<unsigned char>(c))) {
                found_uppercase_letter = true; // Found an uppercase letter. Mark it.
            }
        }

        // If the loop completes, no lowercase letters were found.
        // Now, return true only if at least one uppercase letter was found.
        // This handles cases like "" or "123" which should not be considered "all caps".
        return found_uppercase_letter;
    }

    // Optimized hey function
    // This function implements Bob's response logic based on the query string.
    std::string hey(const std::string& query) {
        // Find the index of the last non-whitespace character.
        // This is an efficient way to ignore trailing whitespace.
        size_t last_non_space_idx = query.find_last_not_of(" \t\n\v\f\r");

        // If no non-whitespace characters are found (string is empty or only whitespace),
        // Bob responds with "Fine. Be that way!".
        if (last_non_space_idx == std::string::npos) {
            return "Fine. Be that way!";
        }

        // Determine if the query consists only of uppercase letters (and contains at least one).
        // This involves a full string traversal.
        bool is_all_caps = has_only_caps_letters(query);

        // Check the last significant character.
        // Using operator[] for character access as bounds are already guaranteed by last_non_space_idx != npos.
        // This avoids the bounds checking overhead of .at() for a minor performance gain.
        if (query[last_non_space_idx] == '?') {
            // If it's a question, check if it's also all caps.
            if (is_all_caps) {
                return "Calm down, I know what I'm doing!"; // Yelling a question
            }
            return "Sure."; // Normal question
        }

        // If it's not a question, check if it's all caps.
        if (is_all_caps) {
            return "Whoa, chill out!"; // Yelling, not a question
        }

        // Default response for other cases (e.g., normal statement).
        return "Whatever.";
    }
}  // namespace bob