#include "raindrops.h"
#include <string> // Use <string> instead of <map> if map is not strictly needed
// Consider removing 'using namespace std;' from header files or for global scope
// It's generally better to qualify names with std::
namespace raindrops
{
    // Use an array of pairs or a series of if conditions if the mappings are fixed and small.
    // A map might introduce overhead for very few fixed elements.
    // For a small, fixed set of values, direct conditional checks are often faster.
    std::string convert(int n)
    {
        std::string result;

        // Using direct if conditions is often more efficient than map lookups for a fixed, small set of values.
        // This avoids the overhead of map creation and lookups.
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