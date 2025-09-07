#include "say.h"
#include <vector>
#include <iostream>
#include <stdexcept>
#include <string>

using namespace std;

namespace say
{
    const vector<string> ones = {"zero", "one", "two", "three", "four", "five", "six",
    "seven", "eight", "nine"};

    const vector<string> teens = {"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"};

    const vector<string> tens = {"", "", "twenty", "thirty", "forty", "fifty", "sixty",
    "seventy", "eighty", "ninety"};

    string say_tens(unsigned long long number)
    {
        if (number < 10)
        {
            return ones[number];
        }
        else if (number < 20)
        {
            return teens[number - 10];
        }
        else
        {
            string result = tens[number / 10];
            if (number % 10 != 0) {
                result += "-" + ones[number % 10];
            }
            return result;
        }
    }

    string say_hundreds(unsigned long long number)
    {
        if (number < 100)
        {
            return say_tens(number);
        }

        string result = ones[number / 100] + " hundred";
        if (number % 100 != 0) {
            result += " " + say_tens(number % 100);
        }

        return result;
    }

    string say_thousands(unsigned long long number)
    {
        if (number < 1000)
        {
            return say_hundreds(number);
        }

        string result = say_hundreds(number / 1000) + " thousand";
        if (number % 1000 != 0) {
            result += " " + say_hundreds(number % 1000);
        }

        return result;
    }

    string say_millions(unsigned long long number)
    {
        if (number < 1000000)
        {
            return say_thousands(number);
        }

        string result = say_thousands(number / 1000000) + " million";
        if (number % 1000000 != 0) {
            result += " " + say_thousands(number % 1000000);
        }

        return result;
    }

    string say_billions(unsigned long long number)
    {
        if (number < 1000000000)
        {
            return say_millions(number);
        }

        string result = say_millions(number / 1000000000) + " billion";
        if (number % 1000000000 != 0) {
            result += " " + say_millions(number % 1000000000);
        }

        return result;
    }

    string in_english(unsigned long long number)
    {
        if (number > 999999999999)
            throw domain_error("Too big");

        if (number < 0)
            throw domain_error("Too small");

        if (number == 0)
        {
            return "zero";
        }

        if (number < 1000)
        {
            return say_hundreds(number);
        }
        else if (number < 1000000)
        {
            return say_thousands(number);
        }
        else if (number < 1000000000)
        {
            return say_millions(number);
        }
        else
            return say_billions(number);
    }
}