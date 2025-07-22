#include "raindrops.h"
#include <string> // Ensure string is included
#include <vector> // For potential future expansion, though not strictly needed here

// It's generally good practice to avoid 'using namespace std;' in headers
// or widely used source files to prevent potential naming collisions.
// However, given the constraint to preserve the original functionality and
// interface, we'll keep it as it was in the original snippet.
using namespace std;

namespace raindrops { // Encapsulate within the raindrops namespace
    string convert(int number)
    {
        string result;
        // Pre-allocate capacity for the longest possible string ("PlingPlangPlong" is 15 chars).
        // This avoids reallocations as the string grows.
        // A small optimization: if we know the result will be a number, we might not need this much,
        // but for the "raindrop" cases, it's beneficial.
        result.reserve(15); 

        bool is_raindrop = false;

        if (number % 3 == 0) {
            result += "Pling";
            is_raindrop = true;
        }
        if (number % 5 == 0) {
            result += "Plang";
            is_raindrop = true;
        }
        if (number % 7 == 0) {
            result += "Plong";
            is_raindrop = true;
        }

        // Only convert to string if no "raindrop" sounds were added.
        // This avoids an unnecessary string conversion in the common case
        // where a raindrop sound is produced.
        if (!is_raindrop) {
            return to_string(number);
        } else {
            return result;
        }
    }
} // namespace raindrops