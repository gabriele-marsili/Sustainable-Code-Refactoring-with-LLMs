#include "bob.h"
#include <string>
#include <cctype>

std::string bob::hey(const std::string& statement)
{
    if (statement.empty()) {
        return "Fine. Be that way!";
    }

    bool has_alpha = false;
    bool has_lowercase = false;
    bool has_question = false;
    
    // Single pass through the string
    for (char c : statement) {
        if (std::isalpha(c)) {
            has_alpha = true;
            if (std::islower(c)) {
                has_lowercase = true;
            }
        } else if (c == '?') {
            has_question = true;
        } else if (!std::isspace(c)) {
            // Non-whitespace, non-alpha, non-question mark character
            // This means it's not just spaces
            if (!has_alpha) {
                has_alpha = false; // Will be used to detect non-alphabetic content
            }
        }
    }
    
    // Check if string contains only whitespace
    bool only_whitespace = true;
    for (char c : statement) {
        if (!std::isspace(c)) {
            only_whitespace = false;
            break;
        }
    }
    
    if (only_whitespace) {
        return "Fine. Be that way!";
    }
    
    // Check if it's a yelling (all uppercase with at least one letter)
    if (has_alpha && !has_lowercase) {
        return "Whoa, chill out!";
    }
    
    // Check if it ends with question mark (ignoring trailing whitespace)
    for (auto it = statement.rbegin(); it != statement.rend(); ++it) {
        if (*it == '?') {
            return "Sure.";
        } else if (!std::isspace(*it)) {
            break;
        }
    }
    
    return "Whatever.";
}