#include "roman_numerals.h"
#include <string>

using namespace std;

namespace roman
{
    static constexpr const char* const ones[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
    static constexpr const char* const tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    static constexpr const char* const hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    static constexpr const char* const thousands[] = {"", "M", "MM", "MMM"};

    string convert(int n)
    {
        string result;
        result.reserve(16);
        
        int thousands_digit = n / 1000;
        n %= 1000;
        int hundreds_digit = n / 100;
        n %= 100;
        int tens_digit = n / 10;
        int ones_digit = n % 10;
        
        result += thousands[thousands_digit];
        result += hundreds[hundreds_digit];
        result += tens[tens_digit];
        result += ones[ones_digit];
        
        return result;
    }
}