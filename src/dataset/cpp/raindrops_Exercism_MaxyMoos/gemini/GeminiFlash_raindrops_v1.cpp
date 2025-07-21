#include "raindrops.h"
#include <string>
#include <vector>
#include <utility> // For std::pair
#include <algorithm> // Not strictly needed for this version but good practice for strings

// Using namespace std; is generally discouraged in headers and often in .cpp files too.
// Explicitly qualify std:: or bring specific names into scope.

namespace raindrops {

// It's a good practice to use a static const container for the mappings
// if they are fixed, to avoid recalculating or re-creating them on each call.
// This reduces setup overhead and memory reallocations.
// Using std::vector<std::pair<int, const char*>> allows for efficient iteration.
static const std::vector<std::pair<int, const char*>> factors = {
    {3, "Pling"},
    {5, "Plang"},
    {7, "Plong"}
};

std::string convert(int number) {
    std::string result;
    // Pre-allocate enough space for the common case ("PlingPlangPlong" is 15 chars).
    // This avoids multiple reallocations as strings are appended.
    result.reserve(15); 

    bool appended = false; // Track if any string has been appended

    for (const auto& p : factors) {
        if (number % p.first == 0) {
            result += p.second;
            appended = true;
        }
    }
    
    // Use an if-else structure to avoid checking result.empty() if appended is already false.
    // This is a micro-optimization but adheres to minimizing execution paths.
    if (appended) {
        return result;
    } else {
        // std::to_string can be relatively expensive.
        // If the numbers are within a small range, a pre-computed lookup table
        // or a custom integer-to-string conversion could be faster,
        // but for general 'int' range, std::to_string is usually the most practical.
        return std::to_string(number);
    }
}

} // namespace raindrops