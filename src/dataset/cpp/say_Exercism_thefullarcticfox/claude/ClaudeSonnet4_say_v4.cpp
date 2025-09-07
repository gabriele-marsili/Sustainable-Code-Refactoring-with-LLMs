#include "say.h"
#include <array>
#include <string_view>
#include <stdexcept>

namespace say {
    std::string in_english(unsigned long long n) {
        if (n > 999999999999ULL)
            throw std::domain_error("more than one trillion");

        static constexpr std::array<std::string_view, 100> ones_tens = {
            "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
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

        static constexpr std::array<std::string_view, 10> ones = {
            "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
        };

        static constexpr std::array<std::string_view, 4> scale = {
            "", " thousand", " million", " billion"
        };

        if (n == 0) return "zero";

        std::string result;
        result.reserve(128);

        unsigned parts[4] = {0};
        int part_count = 0;

        while (n > 0) {
            parts[part_count++] = n % 1000;
            n /= 1000;
        }

        bool first = true;
        for (int i = part_count - 1; i >= 0; --i) {
            unsigned part = parts[i];
            if (part == 0) continue;

            if (!first) result += " ";
            first = false;

            if (part >= 100) {
                result += ones[part / 100];
                result += " hundred";
                part %= 100;
                if (part > 0) result += " ";
            }

            if (part >= 20) {
                result += ones_tens[part / 10 * 10];
                if (part % 10 > 0) {
                    result += "-";
                    result += ones[part % 10];
                }
            } else if (part > 0) {
                result += ones_tens[part];
            }

            result += scale[i];
        }

        return result;
    }
}