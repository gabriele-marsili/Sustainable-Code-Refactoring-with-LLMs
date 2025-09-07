#include "say.h"
#include <vector>
#include <iostream>
#include <stdexcept>
#include <algorithm>

using namespace std;

namespace say
{
    const vector<string> ones = {"zero", "one", "two", "three", "four", "five", "six", 
    "seven", "eight", "nine"};

    const vector<string> teens = {"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"};

    const vector<string> tens = {"", "", "twenty", "thirty", "forty", "fifty", "sixty",
    "seventy", "eighty", "ninety"};

    string in_english(unsigned long long number)
    {
        if(number > 999999999999)
            throw domain_error("Too big");
        
        if(number < 0)
            throw domain_error("Too small");

        if (number == 0)
        {
            return "zero";
        }

        string result;

        if (number >= 1000000000) {
            result += in_english(number / 1000000000) + " billion";
            number %= 1000000000;
            if (number > 0) result += " ";
        }

        if (number >= 1000000) {
            result += in_english(number / 1000000) + " million";
            number %= 1000000;
            if (number > 0) result += " ";
        }

        if (number >= 1000) {
            result += in_english(number / 1000) + " thousand";
            number %= 1000;
            if (number > 0) result += " ";
        }

        if (number >= 100) {
            result += in_english(number / 100) + " hundred";
            number %= 100;
            if (number > 0) result += " ";
        }

        if (number >= 20) {
            result += tens[number / 10];
            number %= 10;
            if (number > 0) result += "-";
        }

        if (number >= 10) {
            result += teens[number - 10];
            number = 0;
        }

        if (number > 0) {
            result += ones[number];
        }
        
        return result;
    }
}