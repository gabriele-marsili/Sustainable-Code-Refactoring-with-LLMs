#include "say.h"
#include <array>
#include <stdexcept>

using namespace std;

namespace say
{
    constexpr array<const char*, 10> ones = {"", "one", "two", "three", "four", "five", "six", 
    "seven", "eight", "nine"};

    constexpr array<const char*, 10> teens = {"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"};

    constexpr array<const char*, 10> tens = {"", "ten", "twenty", "thirty", "forty", "fifty", "sixty",
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

        string result = tens[number / 10];
        if (number % 10 != 0)
        {
            result += "-";
            result += ones[number % 10];
        }
        return result;
    }

    string say_hundreds(unsigned long long number)
    {
        if (number < 100)
        {
            return say_tens(number);
        }

        string result = ones[number / 100];
        result += " hundred";
        
        unsigned long long remainder = number % 100;
        if (remainder != 0)
        {
            result += " ";
            result += say_tens(remainder);
        }

        return result;
    }

    string say_scale(unsigned long long number, unsigned long long scale, const char* scale_name)
    {
        if (number < scale)
        {
            return (scale == 1000) ? say_hundreds(number) : 
                   (scale == 1000000) ? say_thousands(number) : say_millions(number);
        }

        string result = (scale == 1000000000) ? say_millions(number / scale) : say_hundreds(number / scale);
        result += " ";
        result += scale_name;
        
        unsigned long long remainder = number % scale;
        if (remainder != 0)
        {
            result += " ";
            result += (scale == 1000000000) ? say_thousands(remainder) : 
                     (scale == 1000000) ? say_thousands(remainder) : say_hundreds(remainder);
        }

        return result;
    }

    string say_thousands(unsigned long long number)
    {
        return say_scale(number, 1000, "thousand");
    }

    string say_millions(unsigned long long number)
    {
        return say_scale(number, 1000000, "million");
    }

    string say_billions(unsigned long long number)
    {
        return say_scale(number, 1000000000, "billion");
    }

    string in_english(unsigned long long number)
    {
        if(number > 999999999999)
            throw domain_error("Too big");

        if (number == 0)
        {
            return "zero";
        }

        if (number < 100)
        {
            return say_tens(number);
        }
        else if (number < 1000)
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