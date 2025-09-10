#include "roman_numerals.h"
#include <array>
#include <string>

using namespace std;

namespace roman
{
    const array<string, 10> ones = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
    const array<string, 10> tens = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    const array<string, 10> hundreds = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    const array<string, 4> thousands = {"", "M", "MM", "MMM"};

    string convert(int n)
    {
        string result;
        result.reserve(15);

        result = thousands[n / 1000] + result;
        n %= 1000;

        result = hundreds[n / 100] + result;
        n %= 100;

        result = tens[n / 10] + result;
        n %= 10;

        result = ones[n] + result;

        return result;
    }
}