#include "raindrops.h"
#include <string>

namespace raindrops
{
    // The original code is already quite optimized for the given task.
    // For small, fixed sets of conditions like these, a series of if statements
    // is generally the most efficient approach, both in terms of execution time
    // and resource usage (memory, CPU).
    //
    // - It avoids dynamic memory allocations that might come with std::map or std::unordered_map.
    // - It avoids the overhead of hash calculations or tree traversals.
    // - String concatenations (result += "...") are efficient for small strings.
    // - std::to_string for integer conversion is standard and efficient.
    //
    // Any further "optimization" would likely be micro-optimizations with
    // negligible real-world impact or could even make the code less readable
    // without significant performance gains.
    //
    // Therefore, the most sustainable and performant approach is to keep the
    // existing logic.
    std::string convert(int n)
    {
        std::string result;

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
            result = std::to_string(n);
        }

        return result;
    }
}