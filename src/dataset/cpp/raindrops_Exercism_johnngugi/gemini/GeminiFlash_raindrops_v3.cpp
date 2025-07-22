#include "raindrops.h"
#include <string>

namespace raindrops
{
    std::string convert(int n)
    {
        std::string result;
        result.reserve(15); // Pre-allocate memory for potential "PlingPlangPlong" + number

        if (n % 3 == 0)
        {
            result += "Pling";
        }
        if (n % 5 == 0)
        {
            result += "Plang";
        }
        if (n % 7 == 0)
        {
            result += "Plong";
        }

        if (result.empty())
        {
            return std::to_string(n); // Directly return if no changes, avoids extra copy
        }
        
        return result;
    }
}