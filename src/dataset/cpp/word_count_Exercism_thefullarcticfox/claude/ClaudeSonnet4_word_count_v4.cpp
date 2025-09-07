#include "word_count.h"
#include <algorithm>
#include <cctype>

namespace word_count {
    std::map<std::string, int> words(std::string str) {
        std::map<std::string, int> res;
        
        if (str.empty()) {
            return res;
        }
        
        const size_t len = str.length();
        size_t i = 0;
        
        while (i < len) {
            while (i < len && !std::isalnum(str[i]) && str[i] != '\'') {
                ++i;
            }
            
            if (i >= len) break;
            
            size_t start = i;
            while (i < len && (std::isalnum(str[i]) || str[i] == '\'')) {
                str[i] = std::tolower(str[i]);
                ++i;
            }
            
            if (i > start) {
                res[str.substr(start, i - start)]++;
            }
        }
        
        return res;
    }
}