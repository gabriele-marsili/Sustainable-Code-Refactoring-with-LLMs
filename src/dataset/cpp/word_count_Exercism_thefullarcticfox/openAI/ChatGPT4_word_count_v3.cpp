#include "word_count.h"
#include <unordered_map>
#include <cctype>
#include <sstream>

namespace word_count {
    std::map<std::string, int> words(std::string str) {
        std::unordered_map<std::string, int> temp_res;
        std::map<std::string, int> res;

        // Convert to lowercase and replace non-alphanumeric characters (except apostrophes) with spaces
        for (char& c : str) {
            c = std::isalpha(c) || c == '\'' || std::isdigit(c) ? std::tolower(c) : ' ';
        }

        // Tokenize the string using a stringstream
        std::istringstream stream(str);
        std::string word;
        while (stream >> word) {
            temp_res[word]++;
        }

        // Transfer results to std::map to maintain the original interface
        res.insert(temp_res.begin(), temp_res.end());
        return res;
    }
}  // namespace word_count