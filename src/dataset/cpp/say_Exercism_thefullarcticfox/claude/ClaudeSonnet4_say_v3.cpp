#include "say.h"
#include <array>
#include <string_view>
#include <stdexcept>

namespace say {
    std::string in_english(unsigned long long n) {
        if (n > 999999999999ULL)
            throw std::domain_error("more than one trillion");

        static constexpr std::array<std::string_view, 100> ones_tens = {
            "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
            "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
            "twenty", "", "", "", "", "", "", "", "", "",
            "thirty", "", "", "", "", "", "", "", "", "",
            "forty", "", "", "", "", "", "", "", "", "",
            "fifty", "", "", "", "", "", "", "", "", "",
            "sixty", "", "", "", "", "", "", "", "", "",
            "seventy", "", "", "", "", "", "", "", "", "",
            "eighty", "", "", "", "", "", "", "", "", "",
            "ninety", "", "", "", "", "", "", "", "", ""
        };

        if (n < 100 && !ones_tens[n].empty())
            return std::string(ones_tens[n]);

        static constexpr std::array<std::string_view, 4> scale_names = {"", "thousand", "million", "billion"};
        
        std::string result;
        result.reserve(128);
        
        unsigned long long parts[4];
        int num_parts = 0;
        
        unsigned long long temp = n;
        while (temp > 0 && num_parts < 4) {
            parts[num_parts++] = temp % 1000;
            temp /= 1000;
        }
        
        bool first_part = true;
        for (int i = num_parts - 1; i >= 0; --i) {
            unsigned int part = parts[i];
            if (part == 0) continue;
            
            if (!first_part) result += " ";
            first_part = false;
            
            if (part >= 100) {
                result += ones_tens[part / 100];
                result += " hundred";
                if (part % 100) result += " ";
            }
            
            part %= 100;
            if (part >= 20) {
                result += ones_tens[(part / 10) * 10];
                if (part % 10) {
                    result += "-";
                    result += ones_tens[part % 10];
                }
            } else if (part > 0) {
                result += ones_tens[part];
            }
            
            if (i > 0) {
                result += " ";
                result += scale_names[i];
            }
        }
        
        return result;
    }
}