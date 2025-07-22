#include "raindrops.h"
#include <string>

namespace raindrops
{
    std::string convert(int n)
    {
        std::string result;
        result.reserve(10); // Pre-allocate memory for common cases (e.g., "PlingPlangPlong" is 15 chars, a number can be up to 10)

        bool converted = false;

        if (n % 3 == 0)
        {
            result.append("Pling");
            converted = true;
        }
        if (n % 5 == 0)
        {
            result.append("Plang");
            converted = true;
        }
        if (n % 7 == 0)
        {
            result.append("Plong");
            converted = true;
        }

        if (!converted)
        {
            return std::to_string(n); // Return directly if no conversion, avoids an extra copy
        }
        return result;
    }
}