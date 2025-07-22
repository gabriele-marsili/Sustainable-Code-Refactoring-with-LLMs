#include "raindrops.h"
#include <string> // Required for std::to_string

// Using a static const array of pairs to store factors and their corresponding sounds.
// This avoids repeated string literals and allows for easier extension.
// The order matters for efficient conditional checks.
static const std::pair<int, const char*> kRaindropSounds[] = {
    {3, "Pling"},
    {5, "Plang"},
    {7, "Plong"}
};
static const size_t kNumRaindropSounds = sizeof(kRaindropSounds) / sizeof(kRaindropSounds[0]);

string raindrops::convert(int x)
{
    // Using a std::string for result, as the original code does.
    // Pre-allocating capacity to avoid reallocations for common cases.
    // "PlingPlangPlong" is 15 chars, plus null terminator, but reserve takes capacity.
    std::string result;
    result.reserve(15); 

    bool appended = false; // Flag to track if any sound was appended

    // Iterate through the predefined sounds.
    // Using a range-based for loop for clarity and efficiency.
    for (size_t i = 0; i < kNumRaindropSounds; ++i) {
        if (x % kRaindropSounds[i].first == 0) {
            result.append(kRaindropSounds[i].second);
            appended = true;
        }
    }

    // If no sounds were appended, convert the number to a string.
    // This condition is more explicit and potentially slightly more efficient
    // than checking result.empty() after potentially appending.
    if (!appended) {
        return std::to_string(x);
    }
    
    return result;
}