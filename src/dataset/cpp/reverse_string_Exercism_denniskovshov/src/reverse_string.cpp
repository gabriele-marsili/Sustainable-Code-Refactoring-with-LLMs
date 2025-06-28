#include "reverse_string.h"
#include <algorithm>

namespace reverse_string {
    // string in c++ cannot be null, so no input check

    std::string reverse_string(std::string str) {
        // provide 2 iterators which reverse func will invoke and swap contents
        reverse(str.begin(), str.end());
        // alternative: reverse(begin(str), end(str));
        return str;
    }

    std::string reverse_string_iter(const std::string& str) {
        // didn't use 'auto' to fully type and understand the type returned
        std::reverse_iterator<std::string::const_iterator> rev_iter_start = str.crbegin();
        std::reverse_iterator<std::string::const_iterator> rev_iter_end = str.crend();
        std::string reversed_str(rev_iter_start, rev_iter_end);
        return reversed_str;
    }

    std::string reverse_string_manual(std::string str) {
        if (str.length() == 0)
            return str;

        for (size_t start = 0, end = str.length() - 1; start < end; start++, end--)
        {
            auto tmp = str[start];
            str[start] = str[end];
            str[end] = tmp;
        }
        
        return str;
    }
}