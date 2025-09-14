#include "roman_numerals.h"

using namespace std;

namespace roman
{
    static const char* const ones[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
    static const char* const tens[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
    static const char* const hundreds[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
    static const char* const thousands[] = {"", "M", "MM", "MMM"};

    string convert(int n)
    {
        string result;
        result.reserve(16); // Reserve space for typical roman numeral length
        
        // Extract digits
        int digits[4];
        digits[0] = n % 10; n /= 10;
        digits[1] = n % 10; n /= 10;
        digits[2] = n % 10; n /= 10;
        digits[3] = n % 10;
        
        // Build result from left to right (thousands to ones)
        result += thousands[digits[3]];
        result += hundreds[digits[2]];
        result += tens[digits[1]];
        result += ones[digits[0]];
        
        return result;
    }
}