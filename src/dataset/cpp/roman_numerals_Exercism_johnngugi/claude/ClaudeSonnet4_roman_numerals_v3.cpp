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
        
        result += thousands[n / 1000];
        n %= 1000;
        
        result += hundreds[n / 100];
        n %= 100;
        
        result += tens[n / 10];
        n %= 10;
        
        result += ones[n];
        
        return result;
    }
}