#include "raindrops.h"

string raindrops::convert(int x)
{
    constexpr const char* const pling = "Pling";
    constexpr const char* const plang = "Plang";
    constexpr const char* const plong = "Plong";
    
    const bool div3 = x % 3 == 0;
    const bool div5 = x % 5 == 0;
    const bool div7 = x % 7 == 0;
    
    if (!(div3 | div5 | div7)) {
        return std::to_string(x);
    }
    
    string result;
    result.reserve(15);
    
    if (div3) result += pling;
    if (div5) result += plang;
    if (div7) result += plong;
    
    return result;
}