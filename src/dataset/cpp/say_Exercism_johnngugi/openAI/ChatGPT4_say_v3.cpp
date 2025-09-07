#include "say.h"
#include <vector>
#include <string>
#include <stdexcept>

using namespace std;

namespace say
{
    const vector<string> ones = {"", "one", "two", "three", "four", "five", "six", 
    "seven", "eight", "nine"};

    const vector<string> teens = {"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"};

    const vector<string> tens = {"", "", "twenty", "thirty", "forty", "fifty", "sixty",
    "seventy", "eighty", "ninety"};

    inline string say_tens(unsigned long long number)
    {
        if (number < 10)
            return ones[number];
        if (number < 20)
            return teens[number - 10];
        return tens[number / 10] + (number % 10 ? "-" + ones[number % 10] : "");
    }

    inline string say_hundreds(unsigned long long number)
    {
        if (number < 100)
            return say_tens(number);
        return ones[number / 100] + " hundred" + (number % 100 ? " " + say_tens(number % 100) : "");
    }

    inline string say_thousands(unsigned long long number)
    {
        if (number < 1000)
            return say_hundreds(number);
        return say_hundreds(number / 1000) + " thousand" + (number % 1000 ? " " + say_hundreds(number % 1000) : "");
    }

    inline string say_millions(unsigned long long number)
    {
        if (number < 1000000)
            return say_thousands(number);
        return say_thousands(number / 1000000) + " million" + (number % 1000000 ? " " + say_thousands(number % 1000000) : "");
    }

    inline string say_billions(unsigned long long number)
    {
        if (number < 1000000000)
            return say_millions(number);
        return say_millions(number / 1000000000) + " billion" + (number % 1000000000 ? " " + say_thousands(number % 1000000000) : "");
    }

    string in_english(unsigned long long number)
    {
        if (number > 999999999999)
            throw domain_error("Too big");
        if (number == 0)
            return "zero";
        if (number < 100)
            return say_tens(number);
        if (number < 1000)
            return say_hundreds(number);
        if (number < 1000000)
            return say_thousands(number);
        if (number < 1000000000)
            return say_millions(number);
        return say_billions(number);
    }
}