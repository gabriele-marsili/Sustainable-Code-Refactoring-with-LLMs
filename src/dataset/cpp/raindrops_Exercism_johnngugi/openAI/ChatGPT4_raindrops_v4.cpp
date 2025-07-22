#include "raindrops.h"
#include <string>

namespace raindrops
{
    std::string convert(int n)
    {
        std::string result;

        if (!(n % 3)) result += "Pling";
        if (!(n % 5)) result += "Plang";
        if (!(n % 7)) result += "Plong";

        return result.empty() ? std::to_string(n) : result;
    }
}
