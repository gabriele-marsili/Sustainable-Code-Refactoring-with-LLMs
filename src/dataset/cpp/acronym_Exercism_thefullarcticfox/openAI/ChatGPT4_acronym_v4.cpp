#include "acronym.h"
#include <cctype>
#include <string>

namespace acronym {
    std::string acronym(const std::string& str) {
        std::string res;
        res.reserve(str.size()); // Reserve memory to avoid multiple reallocations
        bool new_word = true;

        for (char ch : str) {
            if (std::isalnum(ch)) {
                if (new_word) {
                    res.push_back(std::toupper(ch));
                    new_word = false;
                }
            } else {
                new_word = true;
            }
        }

        res.shrink_to_fit(); // Release any unused capacity
        return res;
    }
}  // namespace acronym