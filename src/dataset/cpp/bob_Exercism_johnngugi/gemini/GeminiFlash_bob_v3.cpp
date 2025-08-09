#include "bob.h"
#include <string>
#include <cctype> // For std::isspace, std::isalpha, std::isupper

// Anonymous namespace for helper functions to limit their scope to this translation unit.
namespace {
    // Helper function to safely pass char to std::isspace by casting to unsigned char.
    inline bool is_space_char(char c) {
        return std::isspace(static_cast<unsigned char>(c));
    }
    // Helper function to safely pass char to std::isalpha by casting to unsigned char.
    inline bool is_alpha_char(char c) {
        return std::isalpha(static_cast<unsigned char>(c));
    }
    // Helper function to safely pass char to std::isupper by casting to unsigned char.
    inline bool is_upper_char(char c) {
        return std::isupper(static_cast<unsigned char>(c));
    }
} // namespace

std::string bob::hey(std::string statement) {
    bool spaces_only = true;
    bool all_uppercase = true; // Tracks if all alphabetic chars encountered are uppercase
    bool has_alpha = false;    // Tracks if any alphabetic char has been encountered

    // First pass: Iterate through the string once to determine core characteristics.
    // This combines the logic of the original first loop, but without its complex early break,
    // ensuring all flags are correctly determined for the entire string.
    for (char c : statement) {
        if (!is_space_char(c)) {
            spaces_only = false; // Found at least one non-whitespace character
        }

        if (is_alpha_char(c)) {
            has_alpha = true; // Found at least one alphabetic character
            if (!is_upper_char(c)) {
                all_uppercase = false; // Found at least one lowercase alphabetic character
            }
        }
    }

    // Apply the response rules in their specified order of precedence.

    // Rule 1: "Fine. Be that way!" - If the statement contains only whitespace characters (or is empty).
    if (spaces_only) {
        return "Fine. Be that way!";
    }

    // Rule 2: "Whoa, chill out!" - If the statement is "yelling".
    // A statement is considered yelling if it contains at least one alphabetic character
    // and all alphabetic characters are uppercase.
    if (all_uppercase && has_alpha) {
        return "Whoa, chill out!";
    }

    // Rule 3: "Sure." - If the statement is a question.
    // A statement is a question if it ends with a question mark, ignoring trailing whitespace.
    bool has_question_mark = false;
    // Iterate backwards from the end of the statement.
    for (auto it = statement.rbegin(); it != statement.rend(); ++it) {
        if (*it == '?') {
            has_question_mark = true;
            break; // Found a question mark, no need to check further.
        } else if (!is_space_char(*it)) {
            // Found a non-whitespace, non-question mark character before a '?',
            // meaning the last meaningful character is not a '?'.
            break;
        }
    }

    if (has_question_mark) {
        return "Sure.";
    }

    // Rule 4: "Whatever." - The default response if none of the above rules apply.
    return "Whatever.";
}