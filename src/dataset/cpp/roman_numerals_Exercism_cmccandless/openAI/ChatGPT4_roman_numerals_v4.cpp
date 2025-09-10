#include "roman_numerals.h"
#include <array>

namespace roman
{
    constexpr std::array<std::pair<const char*, int>, 13> _t = {{
        {"M", 1000}, {"CM", 900}, {"D", 500}, {"CD", 400},
        {"C", 100}, {"XC", 90}, {"L", 50}, {"XL", 40},
        {"X", 10}, {"IX", 9}, {"V", 5}, {"IV", 4}, {"I", 1}
    }};

    std::string convert(int x)
    {
        std::string result;
        result.reserve(15); // Reserve enough space for typical Roman numeral strings
        for (const auto& [key, val] : _t)
        {
            while (x >= val)
            {
                result += key;
                x -= val;
            }
        }
        return result;
    }
}