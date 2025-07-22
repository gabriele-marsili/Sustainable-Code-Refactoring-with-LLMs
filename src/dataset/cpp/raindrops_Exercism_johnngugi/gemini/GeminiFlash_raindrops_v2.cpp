#include "raindrops.h"
#include <string>

namespace raindrops
{
    std::string convert(int n)
    {
        std::string result;
        result.reserve(15); // Pre-allocate memory to avoid reallocations for typical "PlingPlangPlong" cases.
                            // Max possible length is "PlingPlangPlong" (15 characters) or string representation of an int.

        bool is_raindrop = false; // Flag to track if any "Pling", "Plang", or "Plong" is appended.

        if (n % 3 == 0)
        {
            result += "Pling";
            is_raindrop = true;
        }
        if (n % 5 == 0)
        {
            result += "Plang";
            is_raindrop = true;
        }
        if (n % 7 == 0)
        {
            result += "Plong";
            is_raindrop = true;
        }

        if (!is_raindrop) // Use the flag instead of checking result.empty() which might be slightly less efficient.
        {
            result = std::to_string(n);
        }

        return result;
    }
}