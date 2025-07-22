#include "raindrops.h"
#include <string>
#include <vector>
#include <utility> // For std::pair
#include <algorithm> // Not strictly needed for this solution, but good for general inclusion

// Using an unnamed namespace for internal linkage, preventing external visibility
namespace {
    // Using a static const std::vector of std::pair for efficient lookup and
    // to avoid re-creating these pairs on each function call.
    // This provides a fixed, compile-time initialized data structure.
    const std::vector<std::pair<int, const char*>> kRaindropFactors = {
        {3, "Pling"},
        {5, "Plang"},
        {7, "Plong"}
    };
}

std::string raindrops::convert(int number)
{
    std::string result;
    // Pre-allocate memory for the maximum possible string "PlingPlangPlong" (15 chars)
    // plus null terminator, for efficiency and to reduce reallocations.
    // However, std::string::reserve takes the number of characters, not including null terminator.
    result.reserve(15);

    bool appended = false; // Flag to track if any string has been appended

    // Iterate over the pre-defined factors. This is more extensible and potentially
    // more cache-friendly than individual if statements, especially if the number
    // of factors were to grow.
    for (const auto& p : kRaindropFactors) {
        if (number % p.first == 0) {
            result += p.second;
            appended = true;
        }
    }

    // Use the boolean flag instead of result.empty() for a slight performance
    // improvement (avoiding string length calculation).
    if (!appended) {
        return std::to_string(number);
    } else {
        return result;
    }
}