#include "bob.h"
#include <string>
#include <cctype> // For std::isspace, std::isalpha, std::islower

using namespace std;

string bob::hey(string statement)
{
    // Flags to determine statement characteristics in a single forward pass
    bool has_alpha = false;       // True if any alphabetic character is found
    bool has_lower = false;       // True if any lowercase alphabetic character is found
    bool has_non_space = false;   // True if any non-whitespace character is found

    // First pass: Iterate through the statement to determine its overall characteristics.
    // This combines the logic for 'spaces_only', 'all_uppercase', and 'empty_string'
    // from the original code into one efficient loop.
    for (char c : statement) {
        if (std::isalpha(c)) {
            has_alpha = true;
            if (std::islower(c)) {
                has_lower = true;
            }
        }
        if (!std::isspace(c)) {
            has_non_space = true;
        }
    }

    // Condition 1: Check if the statement contains only whitespace characters.
    // This corresponds to the original 'if (spaces_only)' block.
    if (!has_non_space) {
        return "Fine. Be that way!";
    }

    // Condition 2: Check for a "yelling" statement.
    // This corresponds to the original 'else if (all_uppercase && !empty_string)' block.
    // A statement is considered "yelling" if it contains at least one alphabetic character
    // and all alphabetic characters found are uppercase.
    if (has_alpha && !has_lower) {
        return "Whoa, chill out!";
    }

    // Condition 3: Check if the statement ends with a question mark, ignoring trailing whitespace.
    // This uses a reverse iterator, similar to the original, which is efficient for this specific check.
    bool has_question_mark = false;
    for (string::reverse_iterator it = statement.rbegin(); it != statement.rend(); ++it) {
        if (*it == '?') {
            has_question_mark = true;
            break; // Found a '?', so it's a question.
        } else if (!std::isspace(*it)) {
            // Found a non-whitespace, non-'?' character before any '?',
            // so it's not considered a question ending.
            break;
        }
        // If it's a space, continue to the next character (skip it).
    }

    if (has_question_mark) {
        return "Sure.";
    }

    // Condition 4: Default response if none of the above conditions are met.
    // Replaces the unnecessary string initialization and assignment.
    return "Whatever.";
}