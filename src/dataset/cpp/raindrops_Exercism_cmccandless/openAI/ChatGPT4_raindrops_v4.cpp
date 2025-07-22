#include "raindrops.h"

string raindrops::convert(int x)
{
    if (x % 3 != 0 && x % 5 != 0 && x % 7 != 0)
        return std::to_string(x);

    string result;
    result.reserve(15);
    if (x % 3 == 0) result += "Pling";
    if (x % 5 == 0) result += "Plang";
    if (x % 7 == 0) result += "Plong";

    return result;
}
