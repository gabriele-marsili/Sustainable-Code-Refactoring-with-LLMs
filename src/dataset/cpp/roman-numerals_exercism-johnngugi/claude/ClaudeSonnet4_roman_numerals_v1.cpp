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
        
        // Extract digits directly
        int th = n / 1000;
        n %= 1000;
        int h = n / 100;
        n %= 100;
        int t = n / 10;
        int o = n % 10;
        
        // Build result string directly
        result += thousands[th];
        result += hundreds[h];
        result += tens[t];
        result += ones[o];
        
        return result;
    }
}