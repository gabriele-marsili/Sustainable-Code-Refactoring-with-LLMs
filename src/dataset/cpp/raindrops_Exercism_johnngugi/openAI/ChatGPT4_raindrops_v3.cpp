#include "raindrops.h"
#include <string>

namespace raindrops
{
    std::string convert(int n)
    {
        const char* sounds[] = {"Pling", "Plang", "Plong"};
        const int factors[] = {3, 5, 7};
        std::string result;

        if (n % factors[0] == 0) result += sounds[0];
        if (n % factors[1] == 0) result += sounds[1];
        if (n % factors[2] == 0) result += sounds[2];

        return result.empty() ? std::to_string(n) : result;
    }
}
