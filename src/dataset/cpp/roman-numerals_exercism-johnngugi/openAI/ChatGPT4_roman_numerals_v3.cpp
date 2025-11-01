#include "roman_numerals.h"
#include <array>
#include <string>

namespace roman
{
    const std::array<std::string, 10> ones = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
    const std::array<std::string, 10> tens = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    const std::array<std::string, 10> hundreds = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    const std::array<std::string, 4> thousands = {"", "M", "MM", "MMM"};

    std::string convert(int n)
    {
        return thousands[n / 1000] + hundreds[(n / 100) % 10] + tens[(n / 10) % 10] + ones[n % 10];
    }
}