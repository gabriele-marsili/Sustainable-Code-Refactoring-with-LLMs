#include "say.h"
#include <array>
#include <stdexcept>
#include <algorithm>
#include <sstream>

namespace say {

std::string in_english(unsigned long long n) {
    if (n > 999999999999ULL) {
        throw std::domain_error("more than one trillion");
    }

    static constexpr std::array<const char*, 30> dict = {
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
        "eighteen", "nineteen", "twenty", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
        "eighty", "ninety"
    };

    if (n < 20) {
        return dict[n];
    }
    if (n < 100 && n % 10 == 0) {
        return dict[n / 10 + 18];
    }

    std::stringstream result;
    std::array<int, 4> parts = {0, 0, 0, 0};
    
    parts[0] = n % 1000;
    n /= 1000;
    parts[1] = n % 1000;
    n /= 1000;
    parts[2] = n % 1000;
    n /= 1000;
    parts[3] = n % 1000;

    bool need_space = false;

    if (parts[3] > 0) {
        result << in_english(parts[3]) << " billion";
        need_space = true;
    }
    if (parts[2] > 0) {
        if (need_space) result << " ";
        result << in_english(parts[2]) << " million";
        need_space = true;
    }
    if (parts[1] > 0) {
        if (need_space) result << " ";
        result << in_english(parts[1]) << " thousand";
        need_space = true;
    }
    if (parts[0] > 0) {
        if (need_space) result << " ";
        
        int part = parts[0];
        if (part >= 100) {
            result << dict[part / 100] << " hundred";
            part %= 100;
            if (part > 0) result << " ";
        }
        if (part >= 20) {
            result << dict[part / 10 + 18];
            part %= 10;
            if (part > 0) result << "-" << dict[part];
        } else if (part > 0) {
            result << dict[part];
        }
    }

    return result.str();
}

} // namespace say