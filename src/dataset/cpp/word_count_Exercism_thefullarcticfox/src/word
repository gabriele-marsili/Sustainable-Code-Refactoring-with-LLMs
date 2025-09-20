#include "word_count.h"
#include <unordered_map>
#include <cctype>
#include <sstream>

namespace word_count {
    std::map<std::string, int> words(std::string str) {
        std::unordered_map<std::string, int> temp_res;
        std::string word;
        std::ostringstream sanitized;

        // Process the string in one pass
        for (char c : str) {
            if (std::isalnum(c) || c == '\'') {
                sanitized << static_cast<char>(std::tolower(c));
            } else if (sanitized.tellp() > 0) {
                word = sanitized.str();
                temp_res[word]++;
                sanitized.str("");
                sanitized.clear();
            }
        }

        // Handle the last word if any
        if (sanitized.tellp() > 0) {
            word = sanitized.str();
            temp_res[word]++;
        }

        // Convert unordered_map to map for the result
        return std::map<std::string, int>(temp_res.begin(), temp_res.end());
    }
}  // namespace word_count