#include "roman_numerals.h"
#include <string>
#include <array>

using namespace std;

namespace roman
{
    string convert(int n)
    {
        static const array<array<string, 10>, 4> roman_values = {
            {
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
            },
            {
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"
            },
            {
                "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"
            },
            {
                "", "M", "MM", "MMM"
            }
        };

        string result;
        result.reserve(15); // Maximum possible length for a roman numeral up to 3999

        result = roman_values[3][n / 1000] + result;
        n %= 1000;
        result = roman_values[2][n / 100] + result;
        n %= 100;
        result = roman_values[1][n / 10] + result;
        n %= 10;
        result = roman_values[0][n] + result;

        return result;
    }
}