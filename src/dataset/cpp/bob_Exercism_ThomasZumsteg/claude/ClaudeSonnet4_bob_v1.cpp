#include "bob.h"

namespace bob {
    std::string hey(const std::string_view remark) {
        if (remark.empty()) {
            return "Fine. Be that way!";
        }
        
        // Find first and last non-whitespace characters in one pass
        size_t first = 0, last = remark.size() - 1;
        while (first <= last && std::isspace(static_cast<unsigned char>(remark[first]))) ++first;
        while (last > first && std::isspace(static_cast<unsigned char>(remark[last]))) --last;
        
        if (first > last) {
            return "Fine. Be that way!";
        }
        
        bool is_question = remark[last] == '?';
        bool has_letters = false;
        bool is_yelling = false;
        
        // Single pass to check for letters and yelling
        for (size_t i = first; i <= last; ++i) {
            char c = remark[i];
            if (std::isalpha(static_cast<unsigned char>(c))) {
                has_letters = true;
                if (!is_yelling && std::isupper(static_cast<unsigned char>(c))) {
                    is_yelling = true;
                } else if (std::islower(static_cast<unsigned char>(c))) {
                    is_yelling = false;
                    break; // No need to continue if we found lowercase
                }
            }
        }
        
        is_yelling = has_letters && is_yelling;
        
        if (is_yelling && is_question) {
            return "Calm down, I know what I'm doing!";
        } else if (is_yelling) {
            return "Whoa, chill out!";
        } else if (is_question) {
            return "Sure.";
        } else {
            return "Whatever.";
        }
    }
}