#include "raindrops.h"

std::string raindrops::convert(int x)
{
    std::string result;
    if (x % 3 == 0) result += "Pling";
    if (x % 5 == 0) result += "Plang";
    if (x % 7 == 0) result += "Plong";
    if (result.empty()) result = std::to_string(x);
    return result;
}
