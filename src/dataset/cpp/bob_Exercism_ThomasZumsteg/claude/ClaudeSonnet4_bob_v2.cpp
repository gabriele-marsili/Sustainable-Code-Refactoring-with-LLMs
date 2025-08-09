#include "bob.h"

namespace bob {
    std::string hey(const std::string& message) {
        // Find first and last non-whitespace characters in one pass
        auto first = message.find_first_not_of(" \t\n\r\f\v");
        if (first == std::string::npos) {
            return "Fine. Be that way!";
        }
        
        auto last = message.find_last_not_of(" \t\n\r\f\v");
        
        bool is_question = message[last] == '?';
        bool has_letter = false;
        bool is_yelling = false;
        
        // Single pass to check for letters and case
        for (size_t i = first; i <= last; ++i) {
            char c = message[i];
            if (std::isalpha(c)) {
                has_letter = true;
                if (std::islower(c)) {
                    is_yelling = false;
                    break; // Early exit if we find lowercase
                } else {
                    is_yelling = true;
                }
            }
        }
        
        is_yelling = is_yelling && has_letter;
        
        if (is_question && is_yelling) {
            return "Calm down, I know what I'm doing!";
        } else if (is_question) {
            return "Sure.";
        } else if (is_yelling) {
            return "Whoa, chill out!";
        } else {
            return "Whatever.";
        }
    }
}