#include "raindrops.h"

namespace raindrops
{
    string convert(int n)
    {
        string result;
        result.reserve(15); // Pre-allocate for "PlingPlangPlong"
        
        if (n % 3 == 0) result += "Pling";
        if (n % 5 == 0) result += "Plang";
        if (n % 7 == 0) result += "Plong";
        
        return result.empty() ? std::to_string(n) : result;
    }
}