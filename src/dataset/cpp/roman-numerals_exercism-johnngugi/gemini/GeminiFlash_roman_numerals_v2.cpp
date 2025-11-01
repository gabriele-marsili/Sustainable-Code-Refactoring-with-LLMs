#include "roman_numerals.h"
#include <string>
#include <array>

using namespace std;

namespace roman {

    string convert(int n) {
        static const array<string, 10> ones = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
        static const array<string, 10> tens = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        static const array<string, 10> hundreds = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        static const array<string, 4> thousands = {"", "M", "MM", "MMM"};

        string result;
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